document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === 'Karlas' && password === 'Bmwe70') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'admin.html';
        } else {
            alert('Neteisingas vartotojo vardas arba slaptažodis!');
        }
    });
});
