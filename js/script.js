const stageFlow = {
  past: 'present',
  present: 'decision',
  decision: 'future',
  future: 'past'
};

// User makes a choice: loop (stay) or next (advance)
function handleChoice(currentStage, action) {
  if (action === 'loop') {
    restartStage(currentStage); // Re-show current stage
  } else if (action === 'next') {
    const nextStage = stageFlow[currentStage];
    goToStage(nextStage);
  }
}

// Reshow the current stage (loop back to self)
function restartStage(stageId) {
  const current = document.getElementById(stageId);
  current.classList.remove('active');
  current.classList.add('fade-out');

  setTimeout(() => {
    current.classList.remove('fade-out');
    current.classList.add('active');
  }, 1000);
}

// Transition to another stage
function goToStage(nextId) {
  const current = document.querySelector('.stage.active');
  const next = document.getElementById(nextId);

  current.classList.remove('active');
  current.classList.add('fade-out');

  setTimeout(() => {
    current.style.display = 'none';
    current.classList.remove('fade-out');
    next.style.display = 'flex';
    next.classList.add('active');
  }, 1000);
}

// Ambient audio setup
window.addEventListener('DOMContentLoaded', () => {
  const ambient = document.getElementById('ambient');
  if (ambient) ambient.volume = 0.3;
});
