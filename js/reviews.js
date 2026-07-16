/* ==========================================================================
   USER FEEDBACK — screenshot upload gallery + lightbox
   Customers' chat/feedback screenshots are shown full, uncropped, in a
   responsive grid. New screenshots can be uploaded from this page and are
   kept in the browser (localStorage) so they persist on reload.
   ========================================================================== */

const FEEDBACK_STORAGE_KEY = 'clarusFeedbackScreenshots';

/* Starter set of feedback screenshots shown before anything is uploaded. */
const DEFAULT_FEEDBACK_SCREENSHOTS = [
  { id: 'default-1', src: 'https://i.postimg.cc/W15bb3NB/CR-1.jpg', removable: false },
{ id: 'default-2', src: 'https://i.postimg.cc/zGzGrWNq/CR-2.jpg', removable: false },
{ id: 'default-3', src: 'https://i.postimg.cc/L898pfS9/CR-3.jpg', removable: false },
{ id: 'default-4', src: 'https://i.postimg.cc/x1f12HQV/CR-4.jpg', removable: false },
{ id: 'default-5', src: 'https://i.postimg.cc/DwvwTsT9/CR-5.jpg', removable: false },
{ id: 'default-6', src: 'https://i.postimg.cc/g2z2WRpF/CR-6.jpg', removable: false },
{ id: 'default-7', src: 'https://i.postimg.cc/FHrH4c4W/CR-7.jpg', removable: false },
{ id: 'default-8', src: 'https://i.postimg.cc/nhFhJ7Jd/CR-8.jpg', removable: false },
{ id: 'default-10', src: 'https://i.postimg.cc/6pWpXRXM/CR-10.jpg', removable: false },
{ id: 'default-11', src: 'https://i.postimg.cc/5242VvVm/CR-11.jpg', removable: false },
{ id: 'default-12', src: 'https://i.postimg.cc/vBbsrwZh/zeoob-com-24fjopt8c0-photo-(1).png', removable: false },
];

function loadUploadedScreenshots() {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Could not read saved feedback screenshots:', err);
    return [];
  }
}

function saveUploadedScreenshots(list) {
  try {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('Could not save feedback screenshots (storage may be full):', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('feedbackGrid');
  const emptyState = document.getElementById('feedbackEmpty');
  const uploadInput = document.getElementById('feedbackUploadInput');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  if (!grid) return;

  let uploadedScreenshots = loadUploadedScreenshots();

  function allScreenshots() {
    return [...uploadedScreenshots, ...DEFAULT_FEEDBACK_SCREENSHOTS];
  }

  function render() {
    const items = allScreenshots();

    if (emptyState) emptyState.hidden = items.length > 0;
    grid.hidden = items.length === 0;

    grid.innerHTML = items.map((shot) => `
      <figure class="feedback-card reveal is-visible" tabindex="0" role="button"
              data-full="${shot.src}" aria-label="Open feedback screenshot, larger view">
        <div class="feedback-card-media">
          <img src="${shot.src}" alt="Customer feedback screenshot" loading="lazy">
        </div>
        ${shot.removable ? `<button type="button" class="feedback-card-remove" data-remove-id="${shot.id}" aria-label="Remove this screenshot">&times;</button>` : ''}
      </figure>`).join('');

    grid.querySelectorAll('.feedback-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('[data-remove-id]')) return;
        openLightbox(card.dataset.full);
      });
      card.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('[data-remove-id]')) {
          e.preventDefault();
          openLightbox(card.dataset.full);
        }
      });
    });

    grid.querySelectorAll('[data-remove-id]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.removeId;
        uploadedScreenshots = uploadedScreenshots.filter((s) => s.id !== id);
        saveUploadedScreenshots(uploadedScreenshots);
        render();
      });
    });
  }

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('is-open');
  }

  function closeLightbox() {
    lightbox?.classList.remove('is-open');
  }

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('[data-lightbox-close]')) closeLightbox();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---- Upload handling ---- */
  uploadInput?.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []).filter((f) => f.type.startsWith('image/'));
    if (!files.length) return;

    let pending = files.length;
    files.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = () => {
        uploadedScreenshots.unshift({
          id: `upload-${Date.now()}-${idx}`,
          src: reader.result,
          removable: true
        });
        pending -= 1;
        if (pending === 0) {
          saveUploadedScreenshots(uploadedScreenshots);
          render();
        }
      };
      reader.onerror = () => { pending -= 1; };
      reader.readAsDataURL(file);
    });

    uploadInput.value = '';
  });

  render();
});
