import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const serverDirectory = resolve(projectRoot, "dist", "server");
const generatedEntry = resolve(serverDirectory, "index.js");
const vinextEntry = resolve(serverDirectory, "vinext-handler.js");

await mkdir(serverDirectory, { recursive: true });
await copyFile(generatedEntry, vinextEntry);

const wrapper = `import vinextHandler from "./vinext-handler.js";

const fetchHandler =
  typeof vinextHandler === "function"
    ? vinextHandler
    : vinextHandler?.fetch?.bind(vinextHandler);

if (typeof fetchHandler !== "function") {
  throw new TypeError("The generated vinext server does not expose a fetch handler.");
}

export default {
  fetch(request, env, context) {
    return fetchHandler(request, env, context);
  },
};
`;

await writeFile(generatedEntry, wrapper, "utf8");
