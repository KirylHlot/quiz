<?php

$recepient = "kirillhlot@mail.ru";
$sitename = "Мираж Döner";

$phone = trim($_POST["phone"]);
$name = trim($_POST["name"]);
$message = trim($_POST["message"]);

$message = "
<div xmlns=\"http://www.w3.org/1999/xhtml\">
	Телефон: $phone	
	<br>Имя: $name	
	<br>Сообщение: $message
</div>";

$pagetitle = "Новая заявка с нашего сайта $sitename";
mail($recepient, $pagetitle, $message, "Content-type: text/html; charset=\"UTF-8\";\n From: $recepient");