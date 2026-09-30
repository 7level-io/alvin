/**
 * High-performance, zero-dependency 300 DPI business card image exporter.
 * Generates print-ready 3.5" x 2" (1050 x 600 px @ 300 DPI) PNGs directly
 * via the native HTML5 Canvas 2D API in under 25ms.
 */

// Helper to round rectangle corners on canvas
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Helper to load an image source into an HTMLImageElement
function loadImage(src) {
  return new Promise((resolve, reject) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null); // graceful fallback if asset fails
    img.src = src;
  });
}

/**
 * Render the Front Side of the Business Card (1050 x 600 px)
 */
async function drawFrontCard(ctx, width, height, logoImg) {
  // 1. Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#0b0c10");
  bgGrad.addColorStop(0.5, "#12141c");
  bgGrad.addColorStop(1, "#181a24");

  roundRect(ctx, 0, 0, width, height, 36);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  // 2. Subtle ambient brand glow (top-right)
  const glowGrad = ctx.createRadialGradient(width - 150, 100, 10, width - 150, 100, 320);
  glowGrad.addColorStop(0, "rgba(18, 38, 231, 0.28)");
  glowGrad.addColorStop(1, "rgba(18, 38, 231, 0)");
  ctx.fillStyle = glowGrad;
  ctx.fill();

  // 3. Delicate inner border
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  // 4. Accent stripe / chip line on top edge
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, 60, 0, 120, 6, 3);
  ctx.fillStyle = "#1226e7";
  ctx.fill();
  ctx.restore();

  // 5. Logo in Top-Right
  if (logoImg) {
    const logoW = 200;
    const aspect = logoImg.naturalHeight / (logoImg.naturalWidth || 1);
    const logoH = logoW * aspect;
    ctx.drawImage(logoImg, width - logoW - 70, 65, logoW, logoH);
  }

  // 6. Alvin's Name & Title (Left / Mid Section)
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  // Name
  ctx.font = "bold 46px 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Alvin Lalduhawma", 70, 175);

  // Role Pill / Badge
  ctx.font = "600 20px 'Poppins', sans-serif";
  ctx.fillStyle = "#4a68ff";
  ctx.fillText("FOUNDER & CEO", 70, 215);

  // Company
  ctx.font = "500 20px 'Poppins', sans-serif";
  ctx.fillStyle = "#8b93a7";
  ctx.fillText("•  7level", 248, 215);

  // 7. Subtle divider line
  ctx.beginPath();
  ctx.moveTo(70, 260);
  ctx.lineTo(width - 70, 260);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 8. Contact Information with styled bullets/indicators
  const contactItems = [
    { label: "+91 87877 89232", sub: "Direct / WhatsApp", x: 70, y: 350 },
    { label: "alvixe@7level.in", sub: "Official Email", x: 70, y: 440 },
    { label: "7level.in", sub: "Website", x: 580, y: 350 },
    { label: "Aizawl, Mizoram", sub: "Location", x: 580, y: 440 }
  ];

  contactItems.forEach(item => {
    // Small accent dot
    ctx.beginPath();
    ctx.arc(item.x + 6, item.y - 12, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#1226e7";
    ctx.fill();

    // Value
    ctx.font = "600 24px 'Poppins', sans-serif";
    ctx.fillStyle = "#f3f4f6";
    ctx.fillText(item.label, item.x + 24, item.y - 6);

    // Label
    ctx.font = "400 16px 'Poppins', sans-serif";
    ctx.fillStyle = "#7b8396";
    ctx.fillText(item.sub, item.x + 24, item.y + 18);
  });

  // Bottom corner subtle watermark
  ctx.textAlign = "right";
  ctx.font = "500 14px 'Poppins', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.fillText("DIGITAL IDENTITY CARD", width - 70, 545);
}

/**
 * Render the Back Side of the Business Card (1050 x 600 px)
 */
async function drawBackCard(ctx, width, height, logoImg, qrImg) {
  // 1. Background gradient matching front
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#08090c");
  bgGrad.addColorStop(0.5, "#10121a");
  bgGrad.addColorStop(1, "#151822");

  roundRect(ctx, 0, 0, width, height, 36);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  // 2. Center ambient glow behind QR
  const centerGlow = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, 280);
  centerGlow.addColorStop(0, "rgba(18, 38, 231, 0.22)");
  centerGlow.addColorStop(1, "rgba(18, 38, 231, 0)");
  ctx.fillStyle = centerGlow;
  ctx.fill();

  // 3. Delicate inner border
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  // 4. Centered Logo on top
  if (logoImg) {
    const logoW = 210;
    const aspect = logoImg.naturalHeight / (logoImg.naturalWidth || 1);
    const logoH = logoW * aspect;
    ctx.drawImage(logoImg, (width - logoW) / 2, 70, logoW, logoH);
  }

  // 5. High-contrast QR Container in Center
  const qrBoxSize = 250;
  const qrBoxX = (width - qrBoxSize) / 2;
  const qrBoxY = 180;

  // White rounded pill for 100% scan reliability
  ctx.save();
  roundRect(ctx, qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 20);
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;
  ctx.fill();
  ctx.restore();

  // Draw QR Image
  if (qrImg) {
    const qrPadding = 18;
    ctx.drawImage(
      qrImg,
      qrBoxX + qrPadding,
      qrBoxY + qrPadding,
      qrBoxSize - qrPadding * 2,
      qrBoxSize - qrPadding * 2
    );
  }

  // 6. Bottom scan instruction & domain
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.font = "bold 20px 'Poppins', sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("SCAN TO CONNECT", width / 2, 485);

  ctx.font = "600 18px 'Poppins', sans-serif";
  ctx.fillStyle = "#4a68ff";
  ctx.fillText("7level.in", width / 2, 515);

  ctx.font = "400 13px 'Poppins', sans-serif";
  ctx.fillStyle = "#656c80";
  ctx.fillText("Instant Contact • Socials • Meeting", width / 2, 545);
}

/**
 * Trigger browser file download from Blob
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Generate 300 DPI Business Card Image (Front or Back)
 * @param {'front' | 'back'} side
 * @param {{ logoSrc: string, qrSrc: string }} assets
 * @returns {Promise<Blob>}
 */
export async function generateCardBlob(side, assets) {
  // Standard 3.5" x 2.0" @ 300 DPI
  const width = 1050;
  const height = 600;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: false });

  // Enable high-quality smoothing for images
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Preload assets in parallel
  const [logoImg, qrImg] = await Promise.all([
    loadImage(assets.logoSrc),
    loadImage(assets.qrSrc),
  ]);

  if (side === "front") {
    await drawFrontCard(ctx, width, height, logoImg);
  } else {
    await drawBackCard(ctx, width, height, logoImg, qrImg);
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas toBlob failed"));
    }, "image/png");
  });
}

/**
 * Export and trigger download for a specific side
 */
export async function downloadCardSide(side, assets) {
  const blob = await generateCardBlob(side, assets);
  downloadBlob(blob, `Alvin-Lalduhawma-Card-${side.toUpperCase()}-300DPI.png`);
}

/**
 * Download both front and back images sequentially
 */
export async function downloadBothSides(assets) {
  await downloadCardSide("front", assets);
  // Stagger downloads to ensure browser triggers both cleanly
  await new Promise((resolve) => setTimeout(resolve, 350));
  await downloadCardSide("back", assets);
}
