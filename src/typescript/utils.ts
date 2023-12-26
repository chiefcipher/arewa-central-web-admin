function fallBackCopyToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback: Unable to copy text to clipboard", err);
  }

  document.body.removeChild(textArea);
}
export function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    // no clipboard, use fallback

    fallBackCopyToClipboard(text);
  }
}

const months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export function formatDate(dateNum: number) {
  // returns date in 24 Dec 2023 format
  // dateNum is utc date as in Date.now()
  const date = new Date(dateNum);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} `;
}
