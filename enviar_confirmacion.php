<?php
// Archivo: enviar_confirmacion.php

// Le decimos al script que la comunicación será en formato JSON
header('Content-Type: application/json');

// Recibimos los datos que nos envía el JavaScript
$data = json_decode(file_get_contents('php://input'), true);

// Verificamos que tengamos los datos necesarios
if (!isset($data['email_capitan']) || !isset($data['nombre_capitan'])) {
    // Si no vienen los datos, enviamos un error
    echo json_encode(['success' => false, 'message' => 'Faltan datos para enviar el correo.']);
    exit;
}

// Preparamos la información para el correo
$para        = $data['email_capitan'];
$asunto      = '¡Confirmación de Inscripción al Torneo Toma el Juego!';
$mensaje     = "
<html>
<head>
  <title>Confirmación de Inscripción</title>
</head>
<body>
  <p>Hola " . htmlspecialchars($data['nombre_capitan']) . ",</p>
  <p>¡Te confirmamos que hemos recibido la inscripción de tu equipo para el torneo Toma el Juego!</p>
  <p>Revisaremos tus datos y te contactaremos pronto si es necesario. Si tienes alguna duda, puedes responder a este correo.</p>
  <br>
  <p>¡Mucha suerte!</p>
  <p><strong>El equipo de Toma el Juego</strong></p>
</body>
</html>
";

// Para enviar un correo HTML, debemos configurar las cabeceras
$cabeceras   = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=iso-8859-1',
    'From: Toma el Juego <info@tomaeljuego.pe>', // <-- TU CORREO PROFESIONAL
    'Reply-To: info@tomaeljuego.pe',
    'X-Mailer: PHP/' . phpversion()
];
$cabeceras = implode("\r\n", $cabeceras);

// Usamos la función mail() de PHP para enviar el correo
// Hostinger la tiene pre-configurada para que funcione automáticamente
if (mail($para, $asunto, $mensaje, $cabeceras)) {
    echo json_encode(['success' => true, 'message' => 'Correo de confirmación enviado.']);
} else {
    echo json_encode(['success' => false, 'message' => 'El servidor no pudo enviar el correo de confirmación.']);
}
?>