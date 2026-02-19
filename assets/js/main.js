// ─── Sanitization ────────────────────────────────────────────────────────────

/**
 * Strip angle brackets and trim whitespace to prevent HTML injection.
 * Inputs are never inserted into innerHTML, but this adds a second layer.
 */
function sanitize(value) {
    return String(value).trim().replace(/[<>"'`]/g, '');
}

// ─── Validation ───────────────────────────────────────────────────────────────

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_DIGITS_RE = /^\d{10,11}$/; // 10 digits (US) or 11 with leading 1

function validateEmail(value) {
    if (!value) return 'Email address is required.';
    if (!EMAIL_RE.test(value)) return 'Please enter a valid email address.';
    return null;
}

function validatePhone(value) {
    if (!value) return null; // optional field
    const digits = value.replace(/\D/g, '');
    if (!PHONE_DIGITS_RE.test(digits)) {
        return 'Please enter a valid 10-digit phone number.';
    }
    return null;
}

function validateName(value) {
    if (!value) return 'Full name is required.';
    if (value.length < 2) return 'Name must be at least 2 characters.';
    return null;
}

// ─── Error Display ────────────────────────────────────────────────────────────

function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (!input || !errorEl) return;
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
}

function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (!input || !errorEl) return;
    input.classList.remove('error');
    input.removeAttribute('aria-invalid');
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
}

// ─── Form Logic ───────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const submitButton = signupForm.querySelector('.btn-submit');
    const successMessage = document.getElementById('successMessage');

    // Live validation: clear errors as the user corrects their input
    ['name', 'email', 'phone'].forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        input.addEventListener('input', () => clearError(id));
        input.addEventListener('blur', () => {
            const val = sanitize(input.value);
            let error = null;
            if (id === 'name') error = validateName(val);
            if (id === 'email') error = validateEmail(val);
            if (id === 'phone') error = validatePhone(val);
            if (error) showError(id, error);
        });
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // ── Honeypot check ───────────────────────────────────────────────────
        // Bots fill every visible-looking field. Real users never touch this.
        const honeypot = document.getElementById('website').value;
        if (honeypot) {
            // Silently "succeed" — don't alert bots that they were caught
            signupForm.style.display = 'none';
            successMessage.classList.add('show');
            return;
        }

        // ── Sanitize raw values ───────────────────────────────────────────────
        const rawName = sanitize(document.getElementById('name').value);
        const rawEmail = sanitize(document.getElementById('email').value);
        const rawPhone = sanitize(document.getElementById('phone').value);
        const rawInterests = document.getElementById('interests').value;

        // ── Validate ──────────────────────────────────────────────────────────
        const nameError  = validateName(rawName);
        const emailError = validateEmail(rawEmail);
        const phoneError = validatePhone(rawPhone);

        // Clear previous errors before re-evaluating
        ['name', 'email', 'phone'].forEach(clearError);

        let hasErrors = false;
        if (nameError)  { showError('name',  nameError);  hasErrors = true; }
        if (emailError) { showError('email', emailError); hasErrors = true; }
        if (phoneError) { showError('phone', phoneError); hasErrors = true; }

        if (hasErrors) {
            // Focus the first invalid field for accessibility
            const firstError = signupForm.querySelector('.error');
            if (firstError) firstError.focus();
            return;
        }

        // ── Normalise phone for submission ─────────────────────────────────────
        const normalizedPhone = rawPhone ? rawPhone.replace(/\D/g, '') : '';

        const formData = {
            name:      rawName,
            email:     rawEmail,
            phone:     normalizedPhone,
            interests: rawInterests,
            timestamp: new Date().toISOString()
        };

        // ── Submit ────────────────────────────────────────────────────────────
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        try {
            // Phase 1: log locally and POST to the placeholder Vercel function.
            // No data is forwarded to any external service yet.
            console.log('Form submitted:', formData);

            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            // ── Success ───────────────────────────────────────────────────────
            signupForm.style.display = 'none';
            successMessage.classList.add('show');
            signupForm.reset();

            if (typeof gtag !== 'undefined') {
                gtag('event', 'signup', {
                    event_category: 'engagement',
                    event_label: 'newsletter_signup'
                });
            }

        } catch (error) {
            console.error('Submission error:', error);
            submitButton.classList.remove('loading');
            submitButton.disabled = false;

            // Show a non-alert inline error at the form level
            const existingFormError = signupForm.querySelector('.form-submit-error');
            if (!existingFormError) {
                const errMsg = document.createElement('p');
                errMsg.className = 'form-submit-error';
                errMsg.textContent = 'Something went wrong. Please try again or email us directly.';
                submitButton.insertAdjacentElement('afterend', errMsg);
            }
        }
    });

    // ── Smooth scrolling ──────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
