const palette = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");

function getRandomColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return "#" + hex.padStart(6, "0");
}

function generatePalette() {
  palette.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const color = getRandomColor();
    const block = document.createElement("div");
    block.className = "color-block";
    block.style.backgroundColor = color;
    block.textContent = color;
    palette.appendChild(block);
  }
}

generateBtn.addEventListener("click", generatePalette);

// Generate once on load
generatePalette();
