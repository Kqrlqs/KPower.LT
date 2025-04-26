# JavaScript failas (admin.js) - admin puslapis
admin_js_content = """
window.onload = function() {
    // Patikriname, ar yra saugomos rezervacijos
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservationsList = document.getElementById('reservationsList');

    // Pateikiame rezervacijas
    if (reservations.length > 0) {
        reservations.forEach(function(reservation, index) {
            const reservationDiv = document.createElement('div');
            reservationDiv.innerHTML = `
                <p><strong>Automobilio modelis:</strong> ${reservation.carModel}</p>
                <p><strong>Vardas:</strong> ${reservation.customerName}</p>
                <p><strong>Telefonas:</strong> ${reservation.phone}</p>
                <p><strong>Data:</strong> ${reservation.diagnosticDate}</p>
                <p><strong>Laikas:</strong> ${reservation.diagnosticTime}</p>
                <p><strong>Paslauga:</strong> ${reservation.service}</p>
                <p><strong>Žinutė:</strong> ${reservation.message}</p>
                <hr>
            `;
            reservationsList.appendChild(reservationDiv);
        });
    } else {
        reservationsList.innerHTML = "<p>Jokių rezervacijų nėra.</p>";
    }
};
"""
