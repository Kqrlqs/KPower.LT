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

  const data = {
    carBrand,
    carModel,
    carYear,
    appointmentDate,
    serviceType
  };

  fetch("https://script.google.com/macros/s/AKfycbzCTc8fSs5SHT6sImDEz3kI12lWI3JNjpPJn1_beWgLfcT7CVbeH2l-xQVGXBCSj2OX8g/exec", {
    method: "Rezervacijos",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.text())
    .then(result => {
      alert("Rezervacija pateikta!");
      document.getElementById("reservation").reset();
    })
    .catch(error => {
      alert("Klaida siunčiant rezervaciją: " + error);
    });
});

// Admin dalis (veikia vietoje - rodo tik localStorage)
let reservations = [];

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("adminUsername").value;
  const password = document.getElementById("adminPassword").value;

  if (username === "Karlas" && password === "Bmwe70") {
    document.getElementById("admin-login").style.display = "none";
    document.getElementById("reservations-list").classList.remove("hidden");
    document.getElementById("logoutButton").classList.remove("hidden");
    alert("Pastaba: rezervacijos matomos tik iš localStorage. Reikia prijungti prie Google Sheets skaitymui.");
  } else {
    alert("Neteisingas vartotojo vardas arba slaptažodis!");
  }
});

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
