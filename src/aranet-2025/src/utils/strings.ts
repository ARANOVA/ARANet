export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const joinWithSeparators = (
  values: (string | null | undefined)[],
  separators: string[]
): string => {
  const filtered = values.filter((v): v is string => v != null && v !== "");
  let result = "";

  filtered.forEach((val, i) => {
    result += val;
    if (i < filtered.length - 1) {
      result += separators[i] ?? ""; // usa el separador correspondiente si existe
    }
  });

  return result;
}
