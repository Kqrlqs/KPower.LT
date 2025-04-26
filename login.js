document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Sustabdome automatinį formos siuntimą

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === 'Karlas' && password === 'Bmwe70') {
            // Įrašome, kad vartotojas prisijungęs
            localStorage.setItem('isLoggedIn', 'true');
            // Peradresuojame į admin.html puslapį
            window.location.href = 'admin.html';
        } else {
            alert('Neteisingas vartotojo vardas arba slaptažodis!');
        }
    });
});
