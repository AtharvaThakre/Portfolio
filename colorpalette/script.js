const palette = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");
const gradientPreview = document.getElementById("gradientPreview");

function getRandomColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return "#" + hex.padStart(6, "0");
}

function generatePalette() {
  palette.innerHTML = "";
  const colors = [];

  for (let i = 0; i < 5; i++) {
    const color = getRandomColor();
    colors.push(color);

    const block = document.createElement("div");
    block.className = "color-block";
    block.style.backgroundColor = color;
    block.textContent = color;
    palette.appendChild(block);
  }

  updateGradientPreview(colors);
}

function updateGradientPreview(colors) {
  const gradient = `linear-gradient(to right, ${colors.join(", ")})`;
  gradientPreview.style.background = gradient;
}

generateBtn.addEventListener("click", generatePalette);

// Generate once on load
generatePalette();
