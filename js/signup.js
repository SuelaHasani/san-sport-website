   const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const firstName = signupForm.querySelector('#first_name');
        const lastName = signupForm.querySelector('#last_name');
        const email = signupForm.querySelector('#email');
        const password = signupForm.querySelector('#password');
        const confirm = signupForm.querySelector('#confirm_password');
     }
        [firstName, lastName, email, password, confirm].forEach(input => {
            if (!input) return;
            input.addEventListener('input', () => {
                input.classList.remove('is-invalid', 'is-valid');
                const fb = input.parentElement.querySelector('.invalid-feedback');
                if (fb) fb.remove();
            });
        });

           signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            if (!firstName.value.trim()) { createFeedback(firstName, 'First name is required.'); valid = false; } else clearFeedback(firstName);
            if (!lastName.value.trim()) { createFeedback(lastName, 'Last name is required.'); valid = false; } else clearFeedback(lastName);
            if (!email.value.trim() || !isEmailValid(email.value.trim())) { createFeedback(email, 'Enter a valid email.'); valid = false; } else clearFeedback(email);
            if (!password.value || !isPasswordStrong(password.value)) { createFeedback(password, 'Password must be 8+ chars, include upper, lower and number.'); valid = false; } else clearFeedback(password);
            if (confirm.value !== password.value) { createFeedback(confirm, 'Passwords do not match.'); valid = false; } else clearFeedback(confirm);

            if (valid) {
                alert('Registration successful (client-side).');
                signupForm.reset();
                [firstName, lastName, email, password, confirm].forEach(i => i && i.classList.remove('is-valid'));
            }
        });
    