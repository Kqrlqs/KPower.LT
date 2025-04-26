document.getElementById('diagnosticsForm').addEventListener('submit', function(event) {
    const carModel = document.getElementById('carModel').value;
    const customerName = document.getElementById('customerName').value;
    const phone = document.getElementById('phone').value;
    const diagnosticDate = document.getElementById('diagnosticDate').value;
    const diagnosticTime = document.getElementById('diagnosticTime').value;
    const service = document.getElementById('service').value;

    if (!carModel || !customerName || !phone || !diagnosticDate || !diagnosticTime || !service) {
        event.preventDefault(); // Užkerta kelią formai būti išsiųstai
        alert('Visi laukeliai turi būti užpildyti!');
    } else {
        alert('Jūsų rezervacija buvo sėkmingai pateikta!');
    }
});
