<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Сюда можно добавить код для отправки данных в WhatsApp или сохранение их в базе данных

    // Показать сообщение об успешной отправке
    echo "<p style='color: green; font-weight: bold;'>Заявка успешно отправлена!</p>";

    // Отправить пользователя обратно на главную страницу через 3 секунды
    header("refresh:3;url=index.html");  // Это вернёт пользователя на главную страницу
    exit();
}
?>