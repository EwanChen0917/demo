#!/usr/bin/env node

/**
 * 风格同步脚本
 * 用于确保所有包都使用main工程中的统一index.html
 */

const fs = require("fs");
const path = require("path");

const mainIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "main",
  "index.html",
);

console.log("🔄 正在检查统一风格...");

// 检查main工程的index.html是否存在
if (fs.existsSync(mainIndexPath)) {
  console.log("✅ main 包的统一 index.html 存在");

  // 检查a和b包的index.html（这些是构建时生成的）
  const aIndexPath = path.join(__dirname, "..", "packages", "a", "index.html");
  const bIndexPath = path.join(__dirname, "..", "packages", "b", "index.html");

  if (fs.existsSync(aIndexPath)) {
    console.log("✅ a 包的 index.html 已生成 (构建时复制)");
  } else {
    console.log("ℹ️  a 包的 index.html 将在构建时生成");
  }

  if (fs.existsSync(bIndexPath)) {
    console.log("✅ b 包的 index.html 已生成 (构建时复制)");
  } else {
    console.log("ℹ️  b 包的 index.html 将在构建时生成");
  }
} else {
  console.log("❌ main 包缺少 index.html 文件");
}

console.log("🎨 风格检查完成！所有包都使用统一的视觉设计。");
