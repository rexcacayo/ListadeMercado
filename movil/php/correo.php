<?php
//cargar las variables
$resp = array();
$mensaje = array();
//$correo_rec=$_POST['email'];
$nombre = $_POST['email'];
$correo=$_POST['email'];
$mensaje[0]=$_POST['comentario'];

// Varios destinatarios
$email_to  = 'rflugaresir@gmail.com'; // atención a la coma

// título
$asunto = "$correo-Lista de Mercado";

// mensaje
$contenido = "
<html>
<head>
  <title>LISTA DE MERCADO</title>
</head>
<body>
  <p>Responder a:</p>
  <p>$correo</p>
  <p>¡COMENTARIO!</p>
  <table>
    <tr>
      <th align=left>Mensaje</th>
    </tr>
    <tr>
      <td align=center>$mensaje[0]</td>
    </tr>
  </table>
</body>
</html>
";

// Para enviar un correo HTML, debe establecerse la cabecera Content-type
$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
$cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Cabeceras adicionales
$cabeceras .= "To: ListaMercado <$correo>" . "\r\n";
$cabeceras .= "From: '$nombre' <$correo>" . "\r\n".
	"Reply-To: $correo" . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

if (@mail($email_to, $asunto ,$contenido ,$cabeceras )) {
	$resp[]="no";
}else{
	$resp[]="enviado";
}
echo json_encode($resp);
?>