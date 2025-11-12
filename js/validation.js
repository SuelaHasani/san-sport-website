   function createFeedback(input, message) {
        const container = input.parentElement;
        const existing = container.querySelector('.invalid-feedback');
        if (existing) existing.remove();
        const div = document.createElement('div');
        div.className = 'invalid-feedback';
        div.textContent = message;
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        container.appendChild(div);
    }
    function clearFeedback(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        const fb = input.parentElement.querySelector('.invalid-feedback');
        if (fb) fb.remove();
    }
    function isEmailValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function isPasswordStrong(pw) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw);
    }