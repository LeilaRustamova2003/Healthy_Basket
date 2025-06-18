<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST["name"]));
    $surname = htmlspecialchars(trim($_POST["surname"]));
    $email = htmlspecialchars(trim($_POST["email"]));

    $log = "registrations.txt";
    $entry = "სახელი: $name\nგვარი: $surname\nელ-ფოსტა: $email\n---\n";
    file_put_contents($log, $entry, FILE_APPEND);

    // წარმატების შემთხვევაში გადამისამართება მაღაზიის გვერდზე
    header("Location: shop.html");
    exit();
}
?>