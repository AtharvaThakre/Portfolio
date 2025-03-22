document.addEventListener("DOMContentLoaded", function () {
  const timerDisplay = document.getElementById('timer');
  const sessionButtons = document.querySelectorAll('.session-btn');
  const startBtn = document.getElementById('start');
  const pauseBtn = document.getElementById('pause');
  const resetBtn = document.getElementById('reset');
  const themeToggle = document.getElementById('theme-toggle');

  const quoteEl = document.getElementById('quote');
  const sessionCountEl = document.getElementById('pomodoro-count');
  const saveSettingsForm = document.getElementById('settings-form');

  let currentMode = 'work';
  let timer;
  let isRunning = false;
  let remainingTime = 1500;
  let sessionCount = 0;

  const durations = {
    work: 1500,
    short: 300,
    long: 900
  };

  const quotes = [
    "Stay focused, stay sharp.",
    "Discipline beats motivation.",
    "One task at a time.",
    "You’re doing great!",
    "Small progress is still progress.",
    "Keep calm and Pomodoro on."
  ];

  // Format time as MM:SS
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // Update timer on screen
  function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingTime);
  }

  // Switch timer mode (work/short/long)
  function switchMode(mode) {
    clearInterval(timer);
    isRunning = false;
    currentMode = mode;
    remainingTime = durations[mode];
    updateDisplay();
    updateActiveButton();
    showQuote();
  }

  // Highlight active session button
  function updateActiveButton() {
    sessionButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === currentMode);
    });
  }

  // Start countdown
  function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
      remainingTime--;
      updateDisplay();

      if (remainingTime <= 0) {
        clearInterval(timer);
        isRunning = false;
        sessionCount++;
        sessionCountEl.textContent = sessionCount;
        showQuote();
        alert('Time’s up! 🎉');
      }
    }, 1000);
  }

  // Pause countdown
  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  // Reset timer to current mode's duration
  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    remainingTime = durations[currentMode];
    updateDisplay();
  }

  // Show a random motivational quote
  function showQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    quoteEl.textContent = quotes[random];
  }

  // Toggle theme and icon
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.documentElement.classList.toggle('dark'); // Apply dark mode to entire page
    themeToggle.textContent = document.body.classList.contains('dark') ? '🌞' : '🌙';
  });

  // Event listeners for control buttons
  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);

  // Session mode buttons
  sessionButtons.forEach(btn => {
    btn.addEventListener('click', () => switchMode(btn.dataset.mode));
  });

  // Save custom durations from form
  saveSettingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    durations.work = parseInt(document.getElementById('work-duration').value) * 60;
    durations.short = parseInt(document.getElementById('short-duration').value) * 60;
    durations.long = parseInt(document.getElementById('long-duration').value) * 60;
    switchMode(currentMode); // Reset with new settings
    alert("Settings Saved ✅");
  });

  // Initialize
  switchMode('work');
});
