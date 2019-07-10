<?php
$sitename = "Quiz site";
$phone = trim($_POST["phone"]);
$name = trim($_POST["name"]);
$dop_message = trim($_POST["dop_message"]);
$answers = trim($_POST["answers"]);
$recepient = trim($_POST["email_adress"]);
$messeneger = trim($_POST["messeneger"]);

$message = "
<div xmlns=\"http://www.w3.org/1999/xhtml\">
	<b>Имя:</b> $name
	<br><b>Телефон:</b> $phone	
	<br><b>Мессенджер(если был выбран):</b> $messeneger	
	<br><b>Ответы:</b> <br>$answers
	<br><b>Дополнительное сообшение перед отправкой формы:</b> $dop_message
</div>";

$pagetitle = "Новая заявка с нашего сайта $sitename";
mail($recepient, $pagetitle, $message, "Content-type: text/html; charset=\"UTF-8\";\n From: $recepient");