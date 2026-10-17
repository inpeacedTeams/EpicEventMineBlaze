'use strict';
const rules = `ПРАВИЛА ТУРНИРА EPICEVENTMINEBLAZE

ФОРМАТ
BedWars 2×8 на MineBlaze. До 8 команд по 2 игрока.
Турнир проходит по сетке на выбывание.
Побеждает команда, которая уничтожит кровати соперников и останется последней в игре.

ЗАПРЕЩЕНО
• Изумруды и все предметы, купленные за изумруды.
• TNT.
• Палки с отбрасыванием.
• Зелья силы.

ЗАЧАРОВАНИЯ
• Максимум Protection II.
• Максимум Sharpness I.
• Protection III и выше, Sharpness II и выше запрещены.

ЧЕСТНАЯ ИГРА
• Запрещены читы и сторонние модификации, дающие преимущество.
• Автокликеры разрешены.
• Запрещено использование багов карты, дюпов и ошибок режима для получения преимущества.
• Нельзя специально мешать работе сервера.
• Перед турниром все команды проходят проверку на читы.
• Спорные ситуации решает организатор.

НАКАЗАНИЯ
Предупреждение, техническое поражение или дисквалификация.
Наказание зависит от ситуации, а не обязательно следует этому порядку.
Организатор рассматривает также не описанные напрямую нарушения, если они дают нечестное преимущество.

Уважайте соперников и играйте честно!`;

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }, { threshold: 0.07 });
  document.documentElement.classList.add('motion-ready');
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const navLinks = [...document.querySelectorAll('nav a')];
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navLinks.forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -50% 0px', threshold: 0 });
  ['format', 'rules', 'faq'].forEach(id => sectionObserver.observe(document.getElementById(id)));
}
const progress = document.querySelector('.scroll-progress');
let scheduled = false;
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`;
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
const copyButton = document.getElementById('copy-rules');
const status = document.getElementById('copy-status');
const dialog = document.getElementById('copy-dialog');
const text = document.getElementById('rules-text');
text.value = rules;
copyButton.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(rules);
    status.textContent = 'Правила скопированы. Можно отправлять команде!';
  } catch {
    status.textContent = 'Скопируйте правила из открывшегося окна.';
    dialog.showModal();
    text.focus();
    text.select();
  }
});
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
