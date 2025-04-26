// Laukiam, kol visas admin puslapis bus pilnai užkrautas
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Tikrinam ar vartotojas yra prisijungęs
    if (isLoggedIn !== 'true') {
        alert('Jūs neprisijungęs!');
        window.location.href = 'index.html'; // Grąžina į pagrindinį puslapį
        return;
    }

    // Jei prisijungęs - rodom rezervacijas
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservationsList = document.getElementById('reservationsList');

    if (reservations.length === 0) {
        reservationsList.innerHTML = '<p>Šiuo metu nėra jokių rezervacijų.</p>';
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



