# JavaScript failas (script.js) - pagrindinis puslapis
script_js_content = """
document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Formos duomenys
    const reservation = {
        carModel: document.getElementById('carModel').value,
        customerName: document.getElementById('customerName').value,
        phone: document.getElementById('phone').value,
        diagnosticDate: document.getElementById('diagnosticDate').value,
        diagnosticTime: document.getElementById('diagnosticTime').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Saugo registraciją į LocalStorage
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    alert('Rezervacija įrašyta!');
    document.getElementById('reservationForm').reset();
});
"""
