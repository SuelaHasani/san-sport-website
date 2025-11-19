/* Main site script
   - Initializes UI behaviour that is used across pages (theme toggle, small helpers).
   - This file is executed on DOMContentLoaded.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle button (switches .dark-mode on <body>)
    const themeBtn = document.getElementById('theme-toggle');
    // Read persisted theme from localStorage (so theme survives refresh)
    const savedTheme = localStorage.getItem('san_sport_theme');

    // Apply saved theme on load
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeBtn) themeBtn.setAttribute('aria-pressed', 'true');
    } else {
        document.body.classList.remove('dark-mode');
        if (themeBtn) themeBtn.setAttribute('aria-pressed', 'false');
    }

    // If toggle exists, wire click to flip theme and persist choice
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeBtn.setAttribute('aria-pressed', String(isDark));
            localStorage.setItem('san_sport_theme', isDark ? 'dark' : 'light');
        });
    }

    // Accessibility: allow pressing "D" to toggle theme (useful for demos)
    document.addEventListener('keydown', (e) => {
        if (e.key && e.key.toLowerCase() === 'd') {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            if (themeBtn) themeBtn.setAttribute('aria-pressed', String(isDark));
            localStorage.setItem('san_sport_theme', isDark ? 'dark' : 'light');
        }
    });

    // Small helper: set current year in any element with id="year" (common footer)
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Clickable images (fix selector)
    const clickableImgs = document.querySelectorAll('.clickable-img');
    clickableImgs.forEach(img => {
        img.addEventListener('click', () => {
            const target = img.getAttribute('data-target');
            if (target) window.location.href = target;
        });
        img.style.cursor = 'pointer';
    });

    // SLIDESHOW
    let slideIndex = 1;
    function showSlide(n) {
        const slides = document.getElementsByClassName('slide');
        const dots = document.getElementsByClassName('dot');
        if (!slides.length) return;
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        for (let i = 0; i < slides.length; i++) slides[i].classList.remove('active');
        for (let i = 0; i < dots.length; i++) dots[i].classList.remove('active');
        slides[slideIndex - 1].classList.add('active');
        if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add('active');
    }
    window.changeSlide = (n) => { slideIndex += n; showSlide(slideIndex); };
    window.currentSlide = (n) => { slideIndex = n; showSlide(slideIndex); };
    showSlide(slideIndex);

    // VALIDATION HELPERS
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

    // SIGNUP FORM
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const firstName = signupForm.querySelector('#first_name');
        const lastName = signupForm.querySelector('#last_name');
        const email = signupForm.querySelector('#email');
        const password = signupForm.querySelector('#password');
        const confirm = signupForm.querySelector('#confirm_password');

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
    }

    // LOGIN FORM
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
    $(document).ready(function () {
    let total = 0;

    $(".add-btn").click(function () {
        let item = $(this).closest('.item');
        let name = item.data("name");
        let price = parseFloat(item.data("price"));

        $("#cart-list").append(`<li>${name} - $${price}</li>`);

        total += price;
        $("#total").text(total);
    });
});

});

