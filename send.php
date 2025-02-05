<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "rossia786@mail.ru"; // Замени на свой email
    $subject = "Новая заявка с сайта";
    $body = "Имя: $name\nТелефон: $phone\nСообщение: $message";
    $headers = "From: no-reply@yourdomain.com\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Заявка успешно отправлена!";
    } else {
        echo "Ошибка при отправке.";
    }
} else {
    echo "Некорректный запрос.";
}
?>