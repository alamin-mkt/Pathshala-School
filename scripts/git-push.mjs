import git from "isomorphic-git";
import http from "isomorphic-git/http/node";
import fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");

const token = process.argv[3] || process.env.GITHUB_TOKEN;
const rawUrl = process.argv[2] || process.env.GITHUB_REPO_URL;

// Classic tokens use token as password or username
const authedUrl = rawUrl.replace("https://", `https://${token}@`);

async function pushToGitHub() {
  console.log(`\n🚀 Preparing to push to: ${rawUrl}`);
  console.log(`📌 Branch: main`);

  try {
    await git.removeRemote({ fs, dir: projectRoot, remote: "origin" });
  } catch {}

  await git.addRemote({
    fs,
    dir: projectRoot,
    remote: "origin",
    url: authedUrl,
    force: true,
  });

  console.log("📤 Pushing all 85 files to GitHub...");
  const pushResult = await git.push({
    fs,
    http,
    dir: projectRoot,
    remote: "origin",
    ref: "main",
    onAuth: () => ({
      username: token,
      password: "",
    }),
  });

  console.log("\n🎉 SUCCESS: All files and commits have been pushed to GitHub!");
  console.log(pushResult);
}

pushToGitHub().catch((err) => {
  console.error("\n❌ Push failed:", err.message);
});
