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

      // 👉 방향 계산 (박스에서 마우스로 향하는 벡터의 반대)
      let dx = centerX - mouseX;
      let dy = centerY - mouseY;

      const magnitude = Math.hypot(dx, dy);
      if (magnitude === 0) return;

      dx /= magnitude;
      dy /= magnitude;

      const moveAmount = 150; // 이동 거리
      dx *= moveAmount;
      dy *= moveAmount;

      const parentRect = box.parentElement.getBoundingClientRect();
      let currentLeft = parseFloat(box.style.left || 0);
      let currentTop = parseFloat(box.style.top || 0);

      let newLeft = currentLeft + dx;
      let newTop = currentTop + dy;

      // 경계 제한
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
