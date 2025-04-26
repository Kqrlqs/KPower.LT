document.addEventListener('DOMContentLoaded', () => {
    const reservationsList = document.getElementById('reservationsList');

    function loadReservations() {
        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

        reservationsList.innerHTML = '';

        if (reservations.length === 0) {
            reservationsList.innerHTML = '<p>Šiuo metu nėra jokių rezervacijų.</p>';
            return;
        }

        const table = document.createElement('table');
        table.classList.add('reservation-table');

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Vardas</th>
            <th>Telefonas</th>
            <th>El. Paštas</th>
            <th>Data</th>
            <th>Laikas</th>
            <th>Paslauga</th>
            <th>Žinutė</th>
            <th>Statusas</th>
            <th>Veiksmai</th>
        `;
        table.appendChild(headerRow);

        reservations.forEach((reservation, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${reservation.name}</td>
                <td>${reservation.phone}</td>
                <td>${reservation.email}</td>
                <td>${reservation.date}</td>
                <td>${reservation.time}</td>
                <td>${reservation.service}</td>
                <td>${reservation.message || ''}</td>
                <td><span class="status ${reservation.status.toLowerCase()}">${reservation.status}</span></td>
                <td>
                    <select data-index="${index}" class="statusSelect">
                        <option value="Laukiama" ${reservation.status === 'Laukiama' ? 'selected' : ''}>Laukiama</option>
                        <option value="Priimta" ${reservation.status === 'Priimta' ? 'selected' : ''}>Priimta</option>
                        <option value="Baigta" ${reservation.status === 'Baigta' ? 'selected' : ''}>Baigta</option>
                    </select>
                </td>
            `;
            table.appendChild(row);
        });

        reservationsList.appendChild(table);

        // Statuso keitimo funkcija
        document.querySelectorAll('.statusSelect').forEach(select => {
            select.addEventListener('change', function() {
                const index = this.getAttribute('data-index');
                reservations[index].status = this.value;
                localStorage.setItem('reservations', JSON.stringify(reservations));
                loadReservations(); // perkraunam kad atnaujinti spalvas
            });
        });
    }

    loadReservations();
});
