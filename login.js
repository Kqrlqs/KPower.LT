# JavaScript failas (login.js) - admin prisijungimas
login_js_content = """
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Patikriname vartotojo vardą ir slaptažodį
    if (username === 'Karlas' && password === 'Bmwe70') {
        window.location.href = 'admin.html'; // Jei teisingi, nukreipiame į admin puslapį
    } else {
        alert('Neteisingas vartotojo vardas arba slaptažodis');
    }
});
"""
