const reservations = [];

document.addEventListener('DOMContentLoaded', () => {
    loadReservations();
    setupGallery();
});

function loadReservations() {
    const tableBody = document.getElementById('reservationsBody');
    tableBody.innerHTML = '';

    reservations.forEach((res, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${res.name}</td>
            <td>${res.phone}</td>
            <td>${res.email}</td>
            <td>${res.date}</td>
            <td>${res.time}</td>
            <td>${res.service}</td>
            <td>${res.message}</td>
            <td><select onchange="changeStatus(${index}, this.value)">
                <option value="Laukiama" ${res.status === 'Laukiama' ? 'selected' : ''}>Laukiama</option>
                <option value="Priimta" ${res.status === 'Priimta' ? 'selected' : ''}>Priimta</option>
                <option value="Baigta" ${res.status === 'Baigta' ? 'selected' : ''}>Baigta</option>
            </select></td>
            <td><button onclick="deleteReservation(${index})">Ištrinti</button></td>
        `;

        tableBody.appendChild(row);
    });
}

function changeStatus(index, newStatus) {
    reservations[index].status = newStatus;
    loadReservations();
}

function deleteReservation(index) {
    reservations.splice(index, 1);
    loadReservations();
}

// Galerijos funkcijos
function setupGallery() {
    const imageInput = document.getElementById('imageInput');
    const gallery = document.getElementById('gallery');

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.classList.add('gallery-image');
                img.addEventListener('click', () => {
                    gallery.removeChild(img);
                });
                gallery.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
}
