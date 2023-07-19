const streaks = [];

function createStreak() {
  const habitName = document.getElementById('habitName').value;
  const habitColor = document.getElementById('habitColor').value;

  if (habitName.trim() === '') {
    alert('Please enter a valid habit name.');
    return;
  }

  const streak = {
    name: habitName,
    color: habitColor,
  };

  streaks.push(streak);
  saveStreaksLocally();
  renderStreaks();
}

function saveStreaksLocally() {
  localStorage.setItem('streaks', JSON.stringify(streaks));
}

function loadStreaks() {
  const storedStreaks = localStorage.getItem('streaks');
  if (storedStreaks) {
    streaks.push(...JSON.parse(storedStreaks));
  }
}

function renderStreaks() {
  const streaksContainer = document.getElementById('streaks-container');
  streaksContainer.innerHTML = '';

  streaks.forEach(streak => {
    const streakBox = document.createElement('div');
    streakBox.className = 'streak-box';
    streakBox.style.backgroundColor = streak.color;

    const streakName = document.createElement('div');
    streakName.textContent = streak.name;

    streakBox.appendChild(streakName);
    streaksContainer.appendChild(streakBox);
  });
}

loadStreaks();
renderStreaks();
