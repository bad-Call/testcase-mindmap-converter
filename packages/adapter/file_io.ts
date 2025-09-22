export function triggerDownload(
  content: string,
  filename: string,
  mimeType: string
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a); // Required for Firefox
  a.click();
  document.body.removeChild(a); // Clean up
  URL.revokeObjectURL(url);
}

export function selectFile(mimeType: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = mimeType;
    input.style.display = "none"; // Hide the input element
    document.body.appendChild(input);

    input.addEventListener("change", (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            resolve(e.target.result);
          } else {
            reject(new Error("Failed to read file content."));
          }
        };

        reader.onerror = (e) => {
          reject(new Error(`File read error: ${reader.error}`));
        };

        reader.readAsText(file);
      } else {
        reject(new Error("No file selected."));
      }
      document.body.removeChild(input); // Clean up
    });

    input.addEventListener("cancel", () => {
      reject(new Error("File selection cancelled."));
      document.body.removeChild(input); // Clean up
    });

    input.click();
  });
}
