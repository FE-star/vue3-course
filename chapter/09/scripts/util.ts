import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const projectDir = path.join(__dirname, '..');

export const resolveProjectPath = (...args: string[]) => {
  return path.join(projectDir, ...args);
};

export const resolvePackagePath = (...args: string[]) => {
  return path.join(projectDir, 'packages', ...args);
};

export const wirteFile = (file: string, text: string) => {
  const dir = path.dirname(file);
  if (!(fs.existsSync(dir) && fs.statSync(dir).isDirectory())) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(file, text);
};
