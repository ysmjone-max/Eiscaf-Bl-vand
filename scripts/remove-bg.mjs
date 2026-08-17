import { Jimp } from "jimp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function removeBg() {
  const imgPath = path.join(__dirname, "..", "Logo.jpeg");
  const outPath = path.join(__dirname, "..", "public", "logo.png");
  
  const img = await Jimp.read(imgPath);

  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];

    // The checkerboard background alternates between grey shades (~70 to ~115)
    // Gold letters have warm tones (r > 140, g > 90, r > b + 30)
    // White letters have high brightness across all channels (r, g, b > 190)
    const isGold = r > 130 && g > 80 && (r - b) > 25;
    const isWhite = r > 190 && g > 190 && b > 190;
    const isGrey = Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && Math.abs(r - b) < 25;

    if (!isGold && !isWhite) {
      const brightness = (r + g + b) / 3;
      if (brightness < 135) {
        this.bitmap.data[idx + 3] = 0; // fully transparent
      } else if (brightness < 175 && isGrey) {
        const alpha = Math.max(0, Math.min(255, Math.round(((brightness - 135) / 40) * 255)));
        this.bitmap.data[idx + 3] = alpha;
      }
    }
  });

  await img.write(outPath);
  console.log("✅ logo.png saved successfully to public/logo.png");
}

removeBg().catch(console.error);
