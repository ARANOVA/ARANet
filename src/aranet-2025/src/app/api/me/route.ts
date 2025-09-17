import { NextResponse } from 'next/server';
import prisma from '@/prisma';
import { logWarn } from '@/app/lib/logger';
import { User } from '@/interfaces';
import { SingleResponse } from '@aranova/aranova-react-ui';
import { getSession } from '@/app/lib/session';
import { isValidId } from '@/app/lib/responses/server/utils';

export async function GET(): Promise<NextResponse<SingleResponse<User>>> {
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
    const result = prisma.sf_guard_user.findUnique({
      where: {
        id: cookie.id
      },
      include: {
        sf_guard_user_permission: true,
        sf_guard_user_group: true,
        sf_guard_user_profile_sf_guard_user_profile_created_byTosf_guard_user: true,
      }
    });

    if (!result) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      }, { status: 401 });
    }

    return NextResponse.json({
      statusCode: 200,
      data: result as unknown as User || null,
    }, { status: 200 });

  } catch (err) {
    logWarn(`Error GET me: ${err}`);
    return  NextResponse.json({
      statusCode: 500,
      error: "Internal Server Error",
    }, { status: 500 });
  }
}
