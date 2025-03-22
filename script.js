// Typing effect
const text = "Designer <Coder>";
let index = 0;
function type() {
  const typedText = document.getElementById("typed-text");
  if (index < text.length) {
    typedText.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 120);
  }
}
window.onload = type;

// Cursor blink
setInterval(() => {
  const cursor = document.getElementById("cursor");
  cursor.style.visibility = (cursor.style.visibility === 'hidden') ? 'visible' : 'hidden';
}, 500);

// Dark Mode Toggle
const toggle = document.getElementById("darkToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Back to top button
const topBtn = document.getElementById("topBtn");
window.onscroll = function () {
  topBtn.style.display = window.scrollY > 200 ? "block" : "none";
};
topBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
