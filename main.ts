import fs from "node:fs";
import path from "node:path";

const LINE =
  "Every ice cube tray is a tray you carry full exactly once, and never again: you learn it was a mold all along, and the cubes were the cargo you spilled.";

const USAGE = `Usage: node main.ts

Writes a one-line review of the dullest everyday object it can name to
$MAKEFUN_OUTPUT_DIR/entry.txt (default /output when unset).

Options:
  -h, --help  Show this help text and exit.
`;

function fail(message: string): never {
  process.stderr.write(`error: ${message}\n`);
  process.exit(1);
}

function validate(text: string): void {
  if (!text || text.trim().length === 0) {
    fail("entry is empty or only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    fail("entry must be exactly one line");
  }
  const count = [...text].length;
  if (count < 1 || count > 200) {
    fail(`entry must be 1..200 code points, got ${count}`);
  }
}

function main(): void {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    process.stdout.write(USAGE);
    return;
  }

  validate(LINE);

  const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "entry.txt"), LINE + "\n", {
    encoding: "utf8",
  });
}

main();
