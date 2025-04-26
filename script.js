// Rezervacijų sąrašas
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

// Pateikimo funkcija
document.getElementById("reservation").addEventListener("submit", function(e) {
    e.preventDefault();

    const carModel = document.getElementById("carModel").value;
    const carYear = document.getElementById("carYear").value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const serviceType = document.getElementById("serviceType").value;

    const reservation = {
        carModel,
        carYear,
        appointmentDate,
        serviceType,
        status: "Laukiama"
    };

    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    alert("Rezervacija pateikta!");
    document.getElementById("reservation").reset();
    displayReservations();
});

// Admin prisijungimo funkcija
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    if (username === "Karlas" && password === "Bmwe70") {
        document.getElementById("admin-login").style.display = "none";
        document.getElementById("reservations-list").classList.remove("hidden");
        document.getElementById("logoutButton").classList.remove("hidden");
        displayReservations();
    } else {
        alert("Neteisingas vartotojo vardas arba slaptažodis!");
    }
});

// Rezervacijų atvaizdavimas
function displayReservations() {
    const reservationsTable = document.getElementById("reservationsTable").getElementsByTagName('tbody')[0];
    reservationsTable.innerHTML = "";

    reservations.forEach((reservation, index) => {
        const row = reservationsTable.insertRow();

        row.insertCell(0).textContent = reservation.carModel;
        row.insertCell(1).textContent = reservation.carYear;
        row.insertCell(2).textContent = reservation.appointmentDate;
        row.insertCell(3).textContent = reservation.serviceType;

        const statusCell = row.insertCell(4);
        statusCell.textContent = reservation.status;
        statusCell.classList.add(`status-${reservation.status.toLowerCase()}`);

        const actionsCell = row.insertCell(5);
        actionsCell.innerHTML = `
            <button onclick="deleteReservation(${index})">Ištrinti</button>
            <button onclick="changeStatus(${index})">Pakeisti statusą</button>
        `;
        
        row.style.backgroundColor = getStatusColor(reservation.status);
    });
}

// Ištrinti rezervaciją
function deleteReservation(index) {
    reservations.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    displayReservations();
}

// Pakeisti statusą
function changeStatus(index) {
    const newStatus = prompt("Įveskite naują statusą (Laukiama, Priimta, Baigta):");
    if (newStatus && ["Laukiama", "Priimta", "Baigta"].includes(newStatus)) {
        reservations[index].status = newStatus;
        localStorage.setItem("reservations", JSON.stringify(reservations));
        displayReservations();
    } else {
        alert("Neteisingas statuso įrašas!");
    }
}

// Pagal statusą nustatyti spalvas
function getStatusColor(status) {
    switch (status) {
        case "Priimta":
            return "#4CAF50"; // Žalia
        case "Laukiama":
            return "#FFEB3B"; // Geltona
        case "Baigta":
            return "#2196F3"; // Mėlyna
        default:
            return "#FFFFFF"; // Balta
    }
}

// Atsijungti
function logout() {
    document.getElementById("admin-login").style.display = "block";
    document.getElementById("reservations-list").classList.add("hidden");
    document.getElementById("logoutButton").classList.add("hidden");
    alert("Jūs atsijungėte");
}
