export function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}
