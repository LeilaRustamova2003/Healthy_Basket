<?php
session_start();

// ფორმის ვალიდაცია
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $card = htmlspecialchars(trim($_POST["card"]));
  $location = htmlspecialchars(trim($_POST["location"]));
  $phone = htmlspecialchars(trim($_POST["phone"]));

  // ვამოწმებთ ყველა ველის შევსებას
  if (!empty($card) && !empty($location) && !empty($phone)) {
    // წარმატებული შეკვეთის ფაილში შენახვა (არასავალდებულო)
    $entry = "ბარათი: $card\nლოკაცია: $location\nტელეფონი: $phone\n---\n";
    file_put_contents("orders.txt", $entry, FILE_APPEND);

    $_SESSION["order_success"] = "✅ წარმატებით გააფორმეთ შეკვეთა!";
  } else {
    $_SESSION["order_error"] = "❌ გთხოვთ, შეავსოთ ყველა ველი სწორად.";
  }

  header("Location: payment.php");
  exit();
}
?>

<!DOCTYPE html>
<html lang="ka">

<head>
  <meta charset="UTF-8">
  <title>გადახდა - Healthy Basket</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header>
    <div class="logo">Healthy <span>Basket</span></div>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="registration.html">Registration</a></li>
        <li><a href="shop.html">Shop</a></li>
        <li><a href="cart.html">Cart</a></li>
        <li><a href="about.html">About</a></li>
      </ul>
    </nav>
  </header>

  <main class="contact">
    <h1 class="section-title">გადახდის დეტალები</h1>

    <?php
    if (isset($_SESSION["order_success"])) {
      echo "<p class='success-message'>" . $_SESSION["order_success"] . "</p>";
      unset($_SESSION["order_success"]);
    }

    if (isset($_SESSION["order_error"])) {
      echo "<p class='error-message'>" . $_SESSION["order_error"] . "</p>";
      unset($_SESSION["order_error"]);
    }
    ?>

    <form action="payment.php" method="POST" class="contact-form">
      <input type="text" name="card" placeholder="ბარათის ნომერი / PIN" required>
      <input type="text" name="location" placeholder="მისამართი / ლოკაცია" required>
      <input type="text" name="phone" placeholder="ტელეფონის ნომერი" required>
      <button type="submit">შეკვეთის გაფორმება</button>
    </form>
  </main>

  <footer>
    <p>&copy; 2025 Healthy Basket.</p>
  </footer>
</body>

</html>