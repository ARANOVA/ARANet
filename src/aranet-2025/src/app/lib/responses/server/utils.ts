'use server';

// import { NextResponse } from "next/server";

// export const isValidId = (id?: number | string): boolean => {
//   const regex = /^(?:[1-9]\d{0,8}|1\d{9}|20\d{8}|21[0-3]\d{7}|214[0-6]\d{6}|2147[0-3]\d{5}|21474[0-7]\d{4}|214748[0-2]\d{3}|2147483[0-5]\d{2}|21474836[0-3]\d|214748364[0-7])$/;
//   return id !== undefined && regex.test(id.toString()) && !isNaN(Number(id)) && Number(id) > 0;
// }

// export const unauthorized = () => NextResponse.json({
//   statusCode: 401,
//   error: "Unauthorized",
// }, { status: 401 });

// export const forbidden = () => NextResponse.json({
//   statusCode: 403,
//   error: "Forbidden",
// }, { status: 403 });

// export const notFound = () => NextResponse.json({
//   statusCode: 404,
//   error: "Not Found",
// }, { status: 404 });

// export const interalError = () => NextResponse.json({
//   statusCode: 500,
//   error: "Internal Server Error",
// }, { status: 500 });

// export const badRequest = () => NextResponse.json({
//   statusCode: 400,
//   error: "Bad Request",
// }, { status: 400 });

// export const ok = <T>(data?: T) => NextResponse.json({
//   statusCode: 200,
//   data: data || null,
// }, { status: 200 });