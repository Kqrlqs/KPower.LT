document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn !== 'true') {
        alert('Jūs neprisijungęs!');
        window.location.href = 'index.html';  // Jei neprisijungęs, grąžina į pagrindinį puslapį
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

    // Nuotraukų galerijos įkėlimas
    loadGallery();

    // Atsijungimo funkcija
    document.getElementById('logoutBtn').addEventListener('click', logout);
});

// Funkcija, kuri įkelia galeriją
function loadGallery() {
    const gallery = document.getElementById('gallery');
    const images = JSON.parse(localStorage.getItem('galleryImages')) || [];

    gallery.innerHTML = ''; // Išvalome galeriją

    images.forEach((image, index) => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('gallery-item');

        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = `Nuotrauka ${index + 1}`;
        
        // Mygtukas nuotraukai ištrinti
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Ištrinti';
        deleteBtn.addEventListener('click', function() {
            deleteImage(index);
        });

        imgDiv.appendChild(imgElement);
        imgDiv.appendChild(deleteBtn);
        gallery.appendChild(imgDiv);
    });
}

// Nuotraukos įkėlimas
document.getElementById('imageUploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const imageFile = document.getElementById('imageFile').files[0];
    if (!imageFile) {
        alert('Prašome pasirinkti nuotrauką!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageUrl = event.target.result;

        // Išsaugome nuotrauką į localStorage
        let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
        images.push(imageUrl);
        localStorage.setItem('galleryImages', JSON.stringify(images));

        loadGallery(); // Iš naujo įkeliame galeriją
    };

    reader.readAsDataURL(imageFile); // Konvertuojame į nuotraukos URL
});

// Nuotraukos ištrynimas
function deleteImage(index) {
    let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
    images.splice(index, 1); // Pašaliname nuotrauką pagal indeksą
    localStorage.setItem('galleryImages', JSON.stringify(images));

    loadGallery(); // Iš naujo įkeliame galeriją
}

// Atsijungimo funkcija
function logout() {
    localStorage.removeItem('isLoggedIn'); // Pašaliname prisijungimo informaciją
    window.location.href = 'index.html'; // Nukreipiame į pagrindinį puslapį
}
