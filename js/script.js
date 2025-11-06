const stageFlow = {
  past: 'present',
  present: 'decision',
  decision: 'future',
  future: 'past'
};

function handleChoice(currentStage, action) {
  if (action === 'loop') {
    restartStage(currentStage);
  } else if (action === 'next') {
    const nextStage = stageFlow[currentStage];
    goToStage(nextStage);
  }
}

function restartStage(stageId) {
  const current = document.getElementById(stageId);
  current.classList.remove('active');
  current.classList.add('fade-out');

  setTimeout(() => {
    current.classList.remove('fade-out');
    current.classList.add('active');
  }, 1000);
}

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

window.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('moving-box');
  const sub = document.getElementById('sub-question');

  let isMoving = false;

  function setInitialBoxPosition() {
    const subRect = sub.getBoundingClientRect();
    const parentRect = sub.parentElement.getBoundingClientRect();

    box.style.left = `${subRect.right - parentRect.left + 10}px`;
    box.style.top = `${subRect.top - parentRect.top}px`;
  }

  setInitialBoxPosition();
  window.addEventListener('resize', setInitialBoxPosition);

  document.addEventListener('mousemove', (e) => {
    if (isMoving) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const boxRect = box.getBoundingClientRect();
    const centerX = boxRect.left + boxRect.width / 2;
    const centerY = boxRect.top + boxRect.height / 2;

    const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

    if (distance < 100) {
      isMoving = true;

      let dx = centerX - mouseX;
      let dy = centerY - mouseY;

      const magnitude = Math.hypot(dx, dy);
      if (magnitude === 0) return;

      dx /= magnitude;
      dy /= magnitude;

      const moveAmount = 150;
      dx *= moveAmount;
      dy *= moveAmount;

      const parentRect = box.parentElement.getBoundingClientRect();
      let currentLeft = parseFloat(box.style.left || 0);
      let currentTop = parseFloat(box.style.top || 0);

      let newLeft = currentLeft + dx;
      let newTop = currentTop + dy;

      const maxLeft = window.innerWidth - box.offsetWidth - parentRect.left;
      const maxTop = window.innerHeight - box.offsetHeight - parentRect.top;

      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));

      box.style.left = `${newLeft}px`;
      box.style.top = `${newTop}px`;

      setTimeout(() => {
        isMoving = false;
      }, 500);
    }
  });
});
