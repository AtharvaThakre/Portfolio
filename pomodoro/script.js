document.addEventListener("DOMContentLoaded", function () {
  const timerDisplay = document.getElementById('timer');
  const sessionButtons = document.querySelectorAll('.session-btn');
  const startBtn = document.getElementById('start');
  const pauseBtn = document.getElementById('pause');
  const resetBtn = document.getElementById('reset');
  const themeToggle = document.getElementById('theme-toggle');

  const quoteEl = document.getElementById('quote');
  const sessionCountEl = document.getElementById('pomodoro-count'); // correct span ID
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

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingTime);
  }

  function switchMode(mode) {
    clearInterval(timer);
    isRunning = false;
    currentMode = mode;
    remainingTime = durations[mode];
    updateDisplay();
    updateActiveButton();
    showQuote();
  }

  function updateActiveButton() {
    sessionButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === currentMode);
    });
  }

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

  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    remainingTime = durations[currentMode];
    updateDisplay();
  }

  function showQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    quoteEl.textContent = quotes[random];
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '🌞' : '🌙';
  });

  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);

  sessionButtons.forEach(btn => {
    btn.addEventListener('click', () => switchMode(btn.dataset.mode));
  });

  // Save settings from form
  saveSettingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    durations.work = parseInt(document.getElementById('work-duration').value) * 60;
    durations.short = parseInt(document.getElementById('short-duration').value) * 60;
    durations.long = parseInt(document.getElementById('long-duration').value) * 60;
    switchMode(currentMode);
    alert("Settings Saved ✅");
  });

  switchMode('work');
});
