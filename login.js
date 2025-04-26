document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Karlas' && password === 'Bmwe70') {
        window.location.href = 'admin.html';
    } else {
        alert('Neteisingas vartotojo vardas arba slaptažodis');
    }
});


