// avatars.js

// DOM 선택
const copyButtons = document.querySelectorAll('.copy-component');
const stateDots = document.querySelectorAll('.avatar .state');

// 함수 구현
function copyComponentMarkup(button) {
  const uiComponent = button.closest('.ui-component');
  if (!uiComponent) return;
  // 복사할 마크업에서 copy 버튼 제외
  const clone = uiComponent.cloneNode(true);
  const copyBtn = clone.querySelector('.copy-component');
  if (copyBtn) copyBtn.remove();
  const markup = clone.innerHTML.trim();
  navigator.clipboard.writeText(markup);
}

function showCopiedState(button) {
  const originalText = button.textContent;
  button.textContent = '복사됨';
  button.disabled = true;
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 1500);
}

function toggleOnlineState(stateEl) {
  const avatarBtn = stateEl.closest('.avatar');
  if (!avatarBtn) return;
  const srOnly = avatarBtn.querySelector('.sr-only');
  const isOnline = avatarBtn.classList.contains('online');
  if (isOnline) {
    avatarBtn.classList.remove('online');
    avatarBtn.classList.add('offline');
    avatarBtn.setAttribute('aria-pressed', 'false');
    if (srOnly) srOnly.textContent = '오프라인';
  } else {
    avatarBtn.classList.remove('offline');
    avatarBtn.classList.add('online');
    avatarBtn.setAttribute('aria-pressed', 'true');
    if (srOnly) srOnly.textContent = '온라인';
  }
}

// 이벤트 바인딩
copyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    copyComponentMarkup(button);
    showCopiedState(button);
  });
});

stateDots.forEach((dot) => {
  dot.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleOnlineState(dot);
  });
});

// 초기 aria-pressed 상태 설정
document.querySelectorAll('.avatar').forEach((avatarBtn) => {
  if (avatarBtn.classList.contains('online')) {
    avatarBtn.setAttribute('aria-pressed', 'true');
  } else {
    avatarBtn.setAttribute('aria-pressed', 'false');
  }
});
