const currentUser = getCurrentUser();

function getCurrentUser() {
  const storedUsername = localStorage.getItem('username');
  if (storedUsername && storedUsername.trim() !== '') {
    return storedUsername;
  }

  const username = prompt('Please enter your username:');
  if (username && username.trim() !== '') {
    localStorage.setItem('username', username);
    return username;
  }

  alert('Invalid username. Please refresh the page and try again.');
  return null;
}

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
    dates: [],
  };

  saveStreak(streak);
  renderStreaks();
}

function saveStreak(streak) {
  const userStreaks = getUserStreaks();
  userStreaks.push(streak);
  localStorage.setItem(currentUser, JSON.stringify(userStreaks));
}

function getUserStreaks() {
  const userStreaks = localStorage.getItem(currentUser);
  return userStreaks ? JSON.parse(userStreaks) : [];
}

function renderStreaks() {
  renderStreakGrid();
}

function renderStreakGrid() {
  const streakGrid = document.getElementById('streak-grid');
  streakGrid.innerHTML = '';

  const userStreaks = getUserStreaks();
  const today = new Date().toLocaleDateString();

  for (let i = 0; i < 7; i++) {
    const square = document.createElement('div');
    square.className = 'square';

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - i);
    const dateKey = currentDate.toLocaleDateString();

    if (dateKey === today) {
      square.classList.add('today');
      square.onclick = () => handleSquareClick(dateKey, square);
    }

    if (userStreaks.some(streak => streak.dates.includes(dateKey))) {
      square.classList.add('filled');
    }

    streakGrid.appendChild(square);
  }
}

function handleSquareClick(dateKey, square) {
  const userStreaks = getUserStreaks();

  let streakFound = false;
  for (const streak of userStreaks) {
    if (streak.dates.includes(dateKey)) {
      streakFound = true;
      break;
    }
  }

  if (!streakFound) {
    const streak = userStreaks.find(streak => !streak.dates.length);
    if (!streak) {
      alert('You have already completed all your streaks for today.');
      return;
    }

    streak.dates.push(dateKey);
    localStorage.setItem(currentUser, JSON.stringify(userStreaks));
    square.classList.add('filled');
  }
}

renderStreaks();
