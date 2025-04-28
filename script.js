let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

const models = {
  BMW: ["1 Series", "3 Series", "5 Series", "X3", "X5", "X6", "X7"],
  Audi: ["A4", "A6", "Q5", "Q7"],
  Mercedes: ["C Class", "E Class", "S Class", "GLE"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Touareg"]
};

function loadModels() {
  const brand = document.getElementById("carBrand").value;
  const modelSelect = document.getElementById("carModel");
  modelSelect.innerHTML = '<option value="">Pasirinkite modelį</option>';

  if (models[brand]) {
    models[brand].forEach(model => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  }
}

document.getElementById("reservation").addEventListener("submit", function(e) {
  e.preventDefault();

  const carBrand = document.getElementById("carBrand").value;
  const carModel = document.getElementById("carModel").value;
  const carYear = document.getElementById("carYear").value;
  const appointmentDate = document.getElementById("appointmentDate").value;
  const serviceType = document.getElementById("serviceType").value;

  const reservation = {
    carBrand,
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
});

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

function displayReservations() {
  const reservationsTable = document.getElementById("reservationsTable").getElementsByTagName('tbody')[0];
  reservationsTable.innerHTML = "";

  reservations.forEach((reservation, index) => {
    const row = reservationsTable.insertRow();
    row.insertCell(0).textContent = reservation.carBrand;
    row.insertCell(1).textContent = reservation.carModel;
    row.insertCell(2).textContent = reservation.carYear;
    row.insertCell(3).textContent = reservation.appointmentDate;
    row.insertCell(4).textContent = reservation.serviceType;

    const statusCell = row.insertCell(5);
    statusCell.textContent = reservation.status;
    statusCell.classList.add(`status-${reservation.status.toLowerCase()}`);
    statusCell.style.backgroundColor = getStatusColor(reservation.status);

    const actionsCell = row.insertCell(6);
    actionsCell.innerHTML = `
      <button onclick="changeStatus(${index})">Pakeisti statusą</button>
      <button onclick="deleteReservation(${index})">Ištrinti</button>
    `;
  });
}

function deleteReservation(index) {
  reservations.splice(index, 1);
  localStorage.setItem("reservations", JSON.stringify(reservations));
  displayReservations();
}

function changeStatus(index) {
  const newStatus = prompt("Įveskite naują statusą (Laukiama, Priimta, Baigta):");
  if (newStatus && ["Laukiama", "Priimta", "Baigta"].includes(newStatus)) {
    reservations[index].status = newStatus;
    localStorage.setItem("reservations", JSON.stringify(reservations));
    displayReservations();
  } else {
    alert("Neteisingas statuso pasirinkimas!");
  }
}

function getStatusColor(status) {
  switch (status) {
    case "Priimta":
      return "#4CAF50"; // Žalia
    case "Laukiama":
      return "#FFC107"; // Geltona
    case "Baigta":
      return "#2196F3"; // Mėlyna
    default:
      return "#FFFFFF"; // Balta
  }
}

function logout() {
  document.getElementById("admin-login").style.display = "block";
  document.getElementById("reservations-list").classList.add("hidden");
  document.getElementById("logoutButton").classList.add("hidden");
  alert("Jūs atsijungėte!");
}
