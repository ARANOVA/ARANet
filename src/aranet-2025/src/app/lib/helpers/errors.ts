import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type ErrorWithMessage = {
	message: string;
}

export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof (error as Record<string, unknown>).message === 'string'
	);
}

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
	if (isErrorWithMessage(maybeError)) return maybeError;

	try {
		return new Error(JSON.stringify(maybeError));
	} catch {
		// fallback in case there's an error stringifying the maybeError
		// like with circular references for example.
		return new Error(String(maybeError));
	}
}

export function getErrorMessage(error: unknown): string {
	return toErrorWithMessage(error).message;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorNode = (error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined): React.ReactNode => {
	if (!error) return null;

	if (typeof error === 'string') {
		return error;
	}

	if ('message' in error && error.message) {
		return error.message as string;
	}

	return null;
}
