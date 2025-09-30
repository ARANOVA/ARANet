export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Date(obj.getTime()) as any;
  }

  if (Array.isArray(obj)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return obj.map(item => deepClone(item)) as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clonedObj: any = {};
  for (const key in obj) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clonedObj[key] = deepClone((obj as any)[key]);
  }

  return clonedObj;
}
