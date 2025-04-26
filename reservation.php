
<?php
// Duomenų bazės konfigūracija
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "diagnostics_db";

// Sukuriame prisijungimą prie MySQL duomenų bazės
$conn = new mysqli($servername, $username, $password, $dbname);

// Patikrinti prisijungimą
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Apdoroti formą, jei buvo pateikta
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Tikriname, ar visi būtini duomenys yra
    if (isset($_POST['carModel'], $_POST['customerName'], $_POST['phone'], $_POST['diagnosticDate'], $_POST['diagnosticTime'], $_POST['service'])) {
        
        // Saugiai apdoroti gautus duomenis
        $carModel = $conn->real_escape_string($_POST['carModel']);
        $customerName = $conn->real_escape_string($_POST['customerName']);
        $phone = $conn->real_escape_string($_POST['phone']);
        $diagnosticDate = $conn->real_escape_string($_POST['diagnosticDate']);
        $diagnosticTime = $conn->real_escape_string($_POST['diagnosticTime']);
        $service = $conn->real_escape_string($_POST['service']);
        $message = isset($_POST['message']) ? $conn->real_escape_string($_POST['message']) : '';

        // SQL užklausa įrašyti duomenis į duomenų bazę
        $sql = "INSERT INTO reservations (car_model, customer_name, phone, diagnostic_date, diagnostic_time, service, message)
                VALUES ('$carModel', '$customerName', '$phone', '$diagnosticDate', '$diagnosticTime', '$service', '$message')";

        // Atlikti užklausą
        if ($conn->query($sql) === TRUE) {
            echo "Rezervacija sėkmingai įrašyta";
        } else {
            echo "Klaida įrašant duomenis: " . $conn->error;
        }
    } else {
        echo "Trūksta reikiamų laukų!";
    }
}

// Uždaryti duomenų bazės ryšį
$conn->close();
?>

<!DOCTYPE html>
<html lang="lt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Automobilio Diagnostikos Rezervacija</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Automobilio Diagnostikos Rezervacija</h1>

    <form method="POST" id="diagnosticsForm">
        <label for="carModel">Automobilio modelis:</label>
        <input type="text" id="carModel" name="carModel" required><br><br>

        <label for="customerName">Vardas:</label>
        <input type="text" id="customerName" name="customerName" required><br><br>

        <label for="phone">Telefonas:</label>
        <input type="tel" id="phone" name="phone" required><br><br>

        <label for="diagnosticDate">Diagnostikos data:</label>
        <input type="date" id="diagnosticDate" name="diagnosticDate" required><br><br>

        <label for="diagnosticTime">Laikas:</label>
        <input type="time" id="diagnosticTime" name="diagnosticTime" required><br><br>

        <label for="service">Paslauga:</label>
        <select id="service" name="service" required>
            <option value="engine">Variklio diagnostika</option>
            <option value="brakes">Stabdžių patikra</option>
            <option value="electric">Elektronikos patikra</option>
            <option value="full">Pilna diagnostika</option>
        </select><br><br>

        <label for="message">Papildomi komentarai:</label>
        <textarea id="message" name="message"></textarea><br><br>

        <button type="submit">Rezervuoti</button>
    </form>
</body>
</html>
