document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (username === 'Karlas' && password === 'Bmwe70') {
        window.location.href = 'admin.html';
    } else {
        errorMessage.textContent = 'Neteisingas vartotojo vardas arba slaptažodis.';
    }
});
