export class ParseError extends Error {
  constructor(
    message: string,
    public lineNumber: number
  ) {
    super(`${message} (line: ${lineNumber})`);
    this.name = "ParseError";
  }
}

export class RenderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RenderError";
  }
}
