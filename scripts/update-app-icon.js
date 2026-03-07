/**
 * 用概念图替换 APP 图标（降级版）
 * 运行：node scripts/update-app-icon.js
 * 说明：直接复制概念图到各 mipmap 目录，Android 会自动缩放。
 *       如需精确尺寸，可用在线工具或 jimp 脚本手动生成后替换。
 */
const fs = require('fs');
const path = require('path');

const CONCEPT = path.join(__dirname, '../docs/design-concepts/app-icon-microglow-concept.png');
const FOLDERS = ['mipmap-mdpi', 'mipmap-hdpi', 'mipmap-xhdpi', 'mipmap-xxhdpi', 'mipmap-xxxhdpi'];
const RES = path.join(__dirname, '../android/app/src/main/res');

function main() {
  if (!fs.existsSync(CONCEPT)) {
    console.warn('概念图不存在，跳过:', CONCEPT);
    return;
  }
  const buf = fs.readFileSync(CONCEPT);
  for (const folder of FOLDERS) {
    const dir = path.join(RES, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'ic_launcher.png'), buf);
    fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'), buf);
    console.log('✓', folder);
  }
  console.log('APP 图标已更新（直接复制概念图，Android 将自动缩放）');
}
main();
