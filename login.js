document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();  // Sustabdyti formos siuntimą

        const username = document.getElementById('username').value.trim();  // Pašaliname tarpus
        const password = document.getElementById('password').value.trim();  // Pašaliname tarpus

        // Palyginame su teisingais duomenimis
        if (username === 'Karlas' && password === 'Bmwe70') {
            // Išsaugome prisijungimo informaciją
            localStorage.setItem('isLoggedIn', 'true');
            // Nukreipiame į admin puslapį
            window.location.href = 'admin.html';  // Peradresavimas į admin puslapį
        } else {
            alert('Neteisingas vartotojo vardas arba slaptažodis!');
        }
    });
});
