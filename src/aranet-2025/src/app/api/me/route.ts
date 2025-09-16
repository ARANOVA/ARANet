import { NextResponse } from 'next/server';
import { getSession, logWarn } from '@/app/lib';
import { User } from '@/interfaces';
import { SingleResponse } from '@aranova/aranova-react-ui';
import { getUserById } from '@/app/lib/api-wrappers/server';

const isValidId = (id?: number | string): boolean => {
  const regex = /^(?:[1-9]\d{0,8}|1\d{9}|20\d{8}|21[0-3]\d{7}|214[0-6]\d{6}|2147[0-3]\d{5}|21474[0-7]\d{4}|214748[0-2]\d{3}|2147483[0-5]\d{2}|21474836[0-3]\d|214748364[0-7])$/;
  return id !== undefined && regex.test(id.toString()) && !isNaN(Number(id)) && Number(id) > 0;
}

export async function GET(): Promise<NextResponse<SingleResponse<User>>> {
  const cookie = await getSession();
  if (!cookie) {
    return NextResponse.json({
      statusCode: 401,
      error: "Unauthorized",
    }, { status: 401 });
  }
  
  if (!cookie.userNIF) {
    return NextResponse.json({
      statusCode: 400,
      error: "Bad Request",
    }, { status: 400 });
  }

  const isValid = isValidId(cookie.id);

  if (!isValid) {
    return NextResponse.json({
      statusCode: 400,
      error: "Bad Request",
    }, { status: 400 });
  }

  try {
    const result = await getUserById<User>(cookie.id);

    if (!result || result.error) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      }, { status: 401 });
    }

    return NextResponse.json(result);

  } catch (err) {
    logWarn(`Error GET me: ${err}`);
    return  NextResponse.json({
      statusCode: 500,
      error: "Internal Server Error",
    }, { status: 500 });
  }
}
