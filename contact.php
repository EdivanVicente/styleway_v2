<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nome = $_POST["nome"];
  $email = $_POST["email"];
  $telefone = $_POST["telefone"];
  $mensagem = $_POST["mensagem"];

  $to = "contato@styleway.com.br";
  $subject = "Mensagem do site";
  $body = "Nome: $nome\nEmail: $email\nTelefone: $telefone\nMensagem: $mensagem";
  $headers = "From: $email";

  mail($to, $subject, $body, $headers);
  echo "Mensagem enviada com sucesso!";
}
?>
