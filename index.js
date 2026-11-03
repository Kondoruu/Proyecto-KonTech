document.addEventListener('DOMContentLoaded', () => {
    const btnDarkMode = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (btnDarkMode) {
        btnDarkMode.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                btnDarkMode.innerText = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                btnDarkMode.innerText = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });

        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            btnDarkMode.innerText = '☀️';
        }
    }
});