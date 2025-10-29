'use server'

import prisma from '@/prisma';
import { logDebug, logError } from '@/app/lib/logger';
import { NextResponse } from 'next/server';
import { SingleResponse } from '@aranova/aranova-react-ui';
import { createSession, hmacCreatePassword } from '@/app/lib/session';
import { User } from '@/interfaces';
import { isValidUsername } from '@/utils';

// const getRole(perms: ): string => {
//   const found = perms.find(p => p.id === g.sf_guard_group_permission.permission_id);
//   return found?.name;
// }
export async function POST(
  request: Request
): Promise<NextResponse<SingleResponse<User>>> {
  try {
    const body = await request.json();
    const { username, email, password, remember } = body;

    if (!(username || email) || !password || !isValidUsername(username)) {
      return NextResponse.json({
        statusCode: 400,
        error: "Bad Request",
      }, { status: 400 });
    }

    const result = await prisma.sf_guard_user.findUnique({
      where: {
        username,
        is_active: 1,
        deleted_at: null,
      },
      include: {
        sf_guard_user_permission: true,
        sf_guard_user_group: {
          include: {
            sf_guard_group: true
          }
        },
      }
    });
    if (!result) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      }, { status: 401 });
    }

    // createSalt()
    // const p = await hmacCreatePassword(password, result.salt, result.algorithm);
    // await prisma.sf_guard_user.update({
    //   where: {
    //     id: result.id,
    //   },
    //   data: {
    //     password: p,
    //   },
    // });

    const algorithm = result.algorithm === 'sha-256' ? 'SHA-256' : "SHA-512";
    const validPassword =
      result.salt &&
      await hmacCreatePassword(password, result.salt, algorithm) === result.password;

    if (!validPassword) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      }, { status: 401 });
    }

    const perms = await prisma.sf_guard_permission.findMany();
    const user_perms: string[] = result.sf_guard_user_permission.map(uperm => {
      const found = perms.find(p => p.id === uperm.permission_id);
      return found?.name;
    }).filter(p => typeof p === 'string');
    const groups = await prisma.sf_guard_group.findMany({
      where: {
        id: {
          in: result.sf_guard_user_group.map(g => g.group_id)
        }
      },
      include: {
        sf_guard_group_permission: true,
      }
    });
    if (groups) {
      const gperms = groups.flatMap(group => group.sf_guard_group_permission).map(gperm => {
        const found = perms.find(p => p.id === gperm.permission_id);
        return found?.name;
      }).filter(p => typeof p === 'string');
      user_perms.push(...gperms);
    }

    const fullperms = Array.from(new Set(user_perms));
    logDebug(`/api/login: create session for ${result.username} (${result.id}) with roles: ${fullperms.join(", ")}`);
    await createSession(
      result.id,
      result.username,
      result.username,
      fullperms,
      remember
    );

    const data = {
      ...result,
      roles: fullperms,
    } as unknown as User;
    delete data.algorithm;
    delete data.salt;
    delete data.password;
    return NextResponse.json({
      statusCode: 200,
      data,
    }, { status: 200 });
  } catch (err) {
    logError(`Error POST /api/login: ${err}`);
    return NextResponse.json({
      statusCode: 500,
      error: "Internal Server Error",
    }, { status: 500 });
  }
}
