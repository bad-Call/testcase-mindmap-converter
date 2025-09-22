export async function readClipboard(): Promise<string> {
  const text = await navigator.clipboard.readText();
  // Strip BOM if present
  if (text.charCodeAt(0) === 0xfeff) {
    return text.substring(1);
  }
  return text;
}

export async function writeClipboard(text: string): Promise<void> {
  // Add BOM for better compatibility with some applications
  await navigator.clipboard.writeText("\ufeff" + text);
}
