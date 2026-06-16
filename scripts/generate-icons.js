const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputPath = path.join(__dirname, '..', 'public', 'icons', 'icon.svg');
const outputPath = path.join(__dirname, '..', 'public', 'icons');

async function generateIcons() {
  if (!fs.existsSync(inputPath)) {
    console.error('❌ icon.svg не найден!');
    return;
  }

  console.log('🔄 Генерация иконок...');
  
  for (const size of sizes) {
    const output = path.join(outputPath, `icon-${size}x${size}.png`);
    try {
      await sharp(inputPath)
        .resize(size, size)
        .png()
        .toFile(output);
      console.log(`✓ icon-${size}x${size}.png`);
    } catch (err) {
      console.error(`❌ Ошибка для ${size}x${size}:`, err.message);
    }
  }

  console.log('\n✅ Готово! Иконки сгенерированы в public/icons/');
}

generateIcons();
