document.addEventListener('DOMContentLoaded', () => {
	const toggleBtn = document.getElementById('theme-toggle');
	const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	const saved = localStorage.getItem('theme');
	const initial = saved || (prefersDark ? 'dark' : 'light');

	function applyTheme(theme) {
		document.body.classList.toggle('dark-mode', theme === 'dark');
		localStorage.setItem('theme', theme);
		if (toggleBtn) {
			toggleBtn.textContent = theme === 'dark' ? 'Bright Mode' : 'Dark Mode';
			toggleBtn.setAttribute('aria-pressed', theme === 'dark');
		}
	}

	applyTheme(initial);

	if (toggleBtn) {
		toggleBtn.addEventListener('click', () => {
			const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
			applyTheme(newTheme);
		});
	}
});
