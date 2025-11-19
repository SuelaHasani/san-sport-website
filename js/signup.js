/* Signup form handler (lightweight)
   - Basic client-side validation and feedback
*/

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  if (!signupForm) return;

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm.querySelector('input[name="email"]');
    const password = signupForm.querySelector('input[name="password"]');
    const name = signupForm.querySelector('input[name="name"]');

    let ok = true;
    if (!name.value.trim()) { createFeedback(name, 'Please enter your name'); ok = false; } else clearFeedback(name);
    if (!email.value.trim() || !isEmailValid(email.value)) { createFeedback(email, 'Please enter a valid email'); ok = false; } else clearFeedback(email);
    if (!password.value || password.value.length < 6) { createFeedback(password, 'Password must be 6+ characters'); ok = false; } else clearFeedback(password);

    if (!ok) return;
    // Simulate signup success
    alert('Signup submitted (simulation).');
    signupForm.reset();
  });
});
