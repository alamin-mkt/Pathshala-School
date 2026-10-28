import git from "isomorphic-git";
import fs from "fs";
import { resolve, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");

async function initAndCommit() {
  console.log("🚀 Initializing Git repository in:", projectRoot);
  await git.init({ fs, dir: projectRoot, defaultBranch: "main" });

  console.log("📦 Staging files...");

  // Recursive read of files ignoring node_modules, .next, etc.
  const ignoreList = [
    "node_modules",
    ".next",
    ".git",
    ".DS_Store",
    ".env.local",
    "npm-debug.log",
  ];

  function getFiles(dir) {
    const subdirs = fs.readdirSync(dir);
    const files = [];
    for (const subdir of subdirs) {
      if (ignoreList.includes(subdir)) continue;
      const res = resolve(dir, subdir);
      if (fs.statSync(res).isDirectory()) {
        files.push(...getFiles(res));
      } else {
        files.push(relative(projectRoot, res).replace(/\\/g, "/"));
      }
    }
    return files;
  }

  const filesToAdd = getFiles(projectRoot);
  console.log(`📄 Found ${filesToAdd.length} project files to track.`);

  for (const filepath of filesToAdd) {
    await git.add({ fs, dir: projectRoot, filepath });
  }

  console.log("💾 Creating initial commit...");
  const sha = await git.commit({
    fs,
    dir: projectRoot,
    author: {
      name: "Al Amin",
      email: "alamin@pathshala.app",
    },
    message: "Initial commit: Pathshala Multi-Tenant School Management SaaS",
  });

  console.log(`\n✅ Local Git Commit Successful! Commit SHA: ${sha}\n`);
  console.log("Ready to push to GitHub as soon as remote URL is provided.");
}

initAndCommit().catch((err) => {
  console.error("Git error:", err);
});
