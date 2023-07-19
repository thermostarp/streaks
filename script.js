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

    if (userStreaks.includes(dateKey)) {
      square.classList.add('filled');
    }

    streakGrid.appendChild(square);
  }
}

function handleSquareClick(dateKey, square) {
  const userStreaks = getUserStreaks();

  if (!userStreaks.includes(dateKey)) {
    userStreaks.push(dateKey);
    localStorage.setItem(currentUser, JSON.stringify(userStreaks));
    square.classList.add('filled');
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
