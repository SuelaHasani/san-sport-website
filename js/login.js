  const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const email = loginForm.querySelector('#email');
        const password = loginForm.querySelector('#password');

        [email, password].forEach(input => {
            if (!input) return;
            input.addEventListener('input', () => {
                input.classList.remove('is-invalid', 'is-valid');
                const fb = input.parentElement.querySelector('.invalid-feedback');
                if (fb) fb.remove();
            });
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            if (!email.value.trim() || !isEmailValid(email.value.trim())) { createFeedback(email, 'Enter a valid email.'); valid = false; } else clearFeedback(email);
            if (!password.value.trim()) { createFeedback(password, 'Password is required.'); valid = false; } else clearFeedback(password);

            if (valid) {
                alert('Login successful (client-side).');
                loginForm.reset();
                [email, password].forEach(i => i && i.classList.remove('is-valid'));
            }
        });
    }