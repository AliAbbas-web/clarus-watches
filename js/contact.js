/* ==========================================================================
   CONTACT FORM — client-side validation + simulated submission
   No backend here: swap the fetch() stub below for your real endpoint
   (e.g. Formspree, a serverless function, or your own API) when ready.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');

  const validators = {
    name: (v) => v.trim().length >= 2 || 'Please enter your full name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address.',
    phone: (v) => /^[0-9+\s-]{7,15}$/.test(v) || 'Please enter a valid phone number.',
    message: (v) => v.trim().length >= 10 || 'Message should be at least 10 characters.'
  };

  function validateField(input) {
    const rule = validators[input.name];
    if (!rule) return true;
    const result = rule(input.value);
    const field = input.closest('.field');
    const errorEl = field.querySelector('.error-msg');
    if (result === true) {
      field.classList.remove('has-error');
      errorEl.textContent = '';
      return true;
    }
    field.classList.add('has-error');
    errorEl.textContent = result;
    return false;
  }

  form.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = Array.from(form.querySelectorAll('input, textarea'));
    const allValid = inputs.map(validateField).every(Boolean);
    if (!allValid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    // Simulated network delay — replace with a real fetch() to your backend.
    setTimeout(() => {
      status.textContent = "Thanks — your message has been received. We'll reply shortly.";
      status.classList.add('is-visible', 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      setTimeout(() => status.classList.remove('is-visible'), 6000);
    }, 900);
  });
});
