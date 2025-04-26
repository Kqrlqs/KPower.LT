document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservationForm');

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            const newReservation = {
                name,
                phone,
                email,
                date,
                time,
                service,
                message,
                status: 'Laukiama'
            };

            let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
            reservations.push(newReservation);
            localStorage.setItem('reservations', JSON.stringify(reservations));

            alert('Rezervacija pateikta sėkmingai!');
            reservationForm.reset();
        });
    }
});
