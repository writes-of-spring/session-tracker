function escapeCsvValue(value: string) {
  if (value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  if (value.includes(",") || value.includes("\n")) {
    return `"${value}"`;
  }

  return value;
}

export function toCsvRow(values: Array<string | number | boolean | null | undefined>) {
  return values
    .map((value) => {
      if (value === null || value === undefined) {
        return "";
      }
      if (typeof value === "number") {
        return value.toFixed(2);
      }
      if (typeof value === "boolean") {
        return value ? "true" : "false";
      }
      return escapeCsvValue(value);
    })
    .join(",");
}

export function sanitizeFileSegment(value: string) {
  const cleaned = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return cleaned.length > 0 ? cleaned : "therapist";
}

export function downloadCsv(content: string, fileName: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
