import { NextResponse } from 'next/server';
import prisma from '@/prisma';
import { logError } from '@/app/lib/logger';
import { User } from '@/interfaces';
import { SingleResponse } from '@aranova/aranova-react-ui';
import { getSession } from '@/app/lib/session';

export async function GET(): Promise<NextResponse<SingleResponse<User>>> {
  const isValidId = (id?: number | string): boolean => {
    const regex = /^(?:[1-9]\d{0,8}|1\d{9}|20\d{8}|21[0-3]\d{7}|214[0-6]\d{6}|2147[0-3]\d{5}|21474[0-7]\d{4}|214748[0-2]\d{3}|2147483[0-5]\d{2}|21474836[0-3]\d|214748364[0-7])$/;
    return id !== undefined && regex.test(id.toString()) && !isNaN(Number(id)) && Number(id) > 0;
  }

  const cookie = await getSession();
  if (!cookie) {
    return NextResponse.json({
      statusCode: 401,
      error: "Unauthorized",
    }, { status: 401 });
  }
  
  if (!cookie.id) {
    return NextResponse.json({
      statusCode: 400,
      error: "Bad Request",
    }, { status: 400 })
  }

  const isValid = isValidId(cookie.id);

  if (!isValid) {
    return NextResponse.json({
      statusCode: 400,
      error: "Bad Request",
    }, { status: 400 })
  }

  try {
    const result = await prisma.sf_guard_user.findUnique({
      where: {
        id: cookie.id,
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

    const perms = await prisma.sf_guard_permission.findMany();
    const user_perms: string[] = result.sf_guard_user_permission.map(uperm => {
      const found = perms.find(p => p.id === uperm.permission_id);
      return found?.name;
    }).filter(p => typeof p === 'string');
    const groups = await prisma.sf_guard_group.findMany({
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

    const data = {
      ...result,
      roles: fullperms,
    } as unknown as User;
    delete data.algorithm;
    delete data.salt;
    delete data.password;
    delete data.sf_guard_user_group;
    delete data.sf_guard_user_permission;
    return NextResponse.json({
      statusCode: 200,
      data,
    }, { status: 200 });
  } catch (err) {
    logError(`Error GET /api/me: ${err}`);
    return  NextResponse.json({
      statusCode: 500,
      error: "Internal Server Error",
    }, { status: 500 });
  }
}
