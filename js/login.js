/* Login form handler (lightweight)
   - Validates presence of inputs and prevents submission in this demo.
   - Add server integration later as needed.
*/

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  // Handle submit: simple client-side validation
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent actual send in demo
    const email = loginForm.querySelector('input[name="email"]');
    const password = loginForm.querySelector('input[name="password"]');
    let ok = true;

    if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
      createFeedback(email, 'Enter a valid email');
      ok = false;
    } else {
      clearFeedback(email);
    }
    if (!password.value.trim()) {
      createFeedback(password, 'Enter your password');
      ok = false;
    } else {
      clearFeedback(password);
    }

    if (!ok) return;
    // Simulate success
    alert('Login submitted (simulation).');
    // In real app, submit via fetch/XHR to your auth endpoint
  });
});