document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();  // Sustabdyti formos siuntimą

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === 'Karlas' && password === 'Bmwe70') {
            // Išsaugome prisijungimo informaciją
            localStorage.setItem('isLoggedIn', 'true');
            // Nukreipiame į admin puslapį
            window.location.href = 'admin.html';  // Peradresavimas
        } else {
            alert('Neteisingas vartotojo vardas arba slaptažodis!');
        }
    });
});
