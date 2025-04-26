// Prisijungimo informacija
const adminUsername = 'Karlas'; // Vartotojo vardas
const adminPassword = 'Bmwe70'; // Slaptažodis

// Tikriname, ar administratorius yra prisijungęs
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Jei neprisijungęs, nukreipiame į prisijungimo puslapį
    if (isLoggedIn !== 'true') {
        window.location.href = 'index.html'; // Nukreipiamas į prisijungimo puslapį
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
                <th>Būsena</th>
                <th>Keisti būseną</th>
            </tr>
        `;

        reservations.forEach((reservation, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reservation.carModel}</td>
                <td>${reservation.customerName}</td>
                <td>${reservation.phone}</td>
                <td>${reservation.diagnosticDate}</td>
                <td>${reservation.diagnosticTime}</td>
                <td>${reservation.service}</td>
                <td>${reservation.message}</td>
                <td style="background-color: ${getStatusColor(reservation.status)}">${reservation.status}</td>
                <td>
                    <select onchange="changeStatus(${index}, this.value)">
                        <option value="Laukiama" ${reservation.status === 'Laukiama' ? 'selected' : ''}>Laukiama</option>
                        <option value="Priimta" ${reservation.status === 'Priimta' ? 'selected' : ''}>Priimta</option>
                        <option value="Baigta" ${reservation.status === 'Baigta' ? 'selected' : ''}>Baigta</option>
                    </select>
                </td>
            `;
            table.appendChild(row);
        });

        reservationsList.appendChild(table);
    }

    // Nuotraukų galerijos įkėlimas
    loadGallery();

    // Atsijungimo mygtukas
    document.getElementById('logoutBtn').addEventListener('click', logout);
});

// Gauti spalvą pagal būseną
function getStatusColor(status) {
    switch (status) {
        case 'Laukiama':
            return 'yellow'; // Geltona spalva laukiamai rezervacijai
        case 'Priimta':
            return 'lightgreen'; // Šviesiai žalia spalva priimtai rezervacijai
        case 'Baigta':
            return 'lightgray'; // Šviesiai pilka spalva baigtai rezervacijai
        default:
            return 'white';
    }
}

// Pakeisti rezervacijos būseną
function changeStatus(index, newStatus) {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations[index].status = newStatus; // Atnaujiname būseną
    localStorage.setItem('reservations', JSON.stringify(reservations)); // Saugojame atnaujintas rezervacijas

    // Iš naujo įkeliame lentelę su atnaujinta informacija
    const reservationsList = document.getElementById('reservationsList');
    reservationsList.innerHTML = '';
    displayReservations(); // Atnaujiname rezervacijų rodymą
}

// Rezervacijų atvaizdavimas (įtraukiame atnaujintas funkcijas į šią funkciją)
function displayReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservationsList = document.getElementById('reservationsList');

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
                <th>Būsena</th>
                <th>Keisti būseną</th>
            </tr>
        `;

        reservations.forEach((reservation, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reservation.carModel}</td>
                <td>${reservation.customerName}</td>
                <td>${reservation.phone}</td>
                <td>${reservation.diagnosticDate}</td>
                <td>${reservation.diagnosticTime}</td>
                <td>${reservation.service}</td>
                <td>${reservation.message}</td>
                <td style="background-color: ${getStatusColor(reservation.status)}">${reservation.status}</td>
                <td>
                    <select onchange="changeStatus(${index}, this.value)">
                        <option value="Laukiama" ${reservation.status === 'Laukiama' ? 'selected' : ''}>Laukiama</option>
                        <option value="Priimta" ${reservation.status === 'Priimta' ? 'selected' : ''}>Priimta</option>
                        <option value="Baigta" ${reservation.status === 'Baigta' ? 'selected' : ''}>Baigta</option>
                    </select>
                </td>
            `;
            table.appendChild(row);
        });

        reservationsList.appendChild(table);
    }
}

// Nuotraukų galerijos įkėlimas
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
    window.location.href = 'index.html'; // Nukreipiame į prisijungimo puslapį
}
