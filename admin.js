document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Jei vartotojas neprisijungęs, perkeliam jį į pagrindinį puslapį
    if (isLoggedIn !== 'true') {
        alert('Jūs neprisijungęs!');
        window.location.href = 'index.html';  // Grąžina į pagrindinį puslapį
        return;
    }

    // Paimame rezervacijas iš localStorage
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservationsList = document.getElementById('reservationsList');

    // Jei nėra rezervacijų
    if (reservations.length === 0) {
        reservationsList.innerHTML = '<p>Nėra jokių rezervacijų.</p>';
    } else {
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Automobilio Modelis</th>
                <th>Vardas</th>
                <th>Telefonas</th>
                <th>Data</th>
                <th>Laikas</th>
                <th>Paslauga</th>
                <th>Komentaras</th>
            </tr>
        `;

        // Pridedame eilutes su rezervacijomis
        reservations.forEach(reservation => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reservation.carModel}</td>
                <td>${reservation.customerName}</td>
                <td>${reservation.phone}</td>
                <td>${reservation.diagnosticDate}</td>
                <td>${reservation.diagnosticTime}</td>
                <td>${reservation.service}</td>
                <td>${reservation.message}</td>
            `;
            table.appendChild(row);
        });

        reservationsList.appendChild(table);
    }
});
