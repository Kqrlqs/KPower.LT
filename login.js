// Laukiam, kol puslapis pilnai užsikraus
document.addEventListener('DOMContentLoaded', function() {
    
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Sustabdom formos standartinį siuntimą

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Patikriname vartotoją ir slaptažodį
        if (username === 'Karlas' && password === 'Bmwe70') {
            // Jei prisijungimas sėkmingas, nustatome "prisijungimo" žymę į localStorage
            localStorage.setItem('isLoggedIn', 'true');
            // Ir peradresuojame į admin puslapį
            window.location.href = 'admin.html';
        } else {
            alert('Neteisingas vartotojo vardas arba slaptažodis!');
        }
    });

});
