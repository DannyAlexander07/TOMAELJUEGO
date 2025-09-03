<?php
// Archivo: enviar_confirmacion.php - Versión con CENTRADO AUTOMÁTICO
die("ESTOY EJECUTANDO LA VERSIÓN MÁS NUEVA DEL ARCHIVO - " . date('H:i:s'));
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email_capitan']) || !isset($data['nombre_capitan'])) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos para generar la imagen.']);
    exit;
}

// --- CONFIGURACIÓN ---
$nombreCapitan = $data['nombre_capitan'];
$emailCapitan = $data['email_capitan'];
$asunto = '¡Registro Exitoso en TOMA EL JUEGO!';

$rutaImagenBase = __DIR__ . '/email_assets/emaildeconfirmacion_VF.png';
$rutaFuente = __DIR__ . '/fonts/Universe/Univers-BlackExt.otf';
$directorioSalida = __DIR__ . '/email_assets/generadas/';
$urlImagenGenerada = 'https://tomaeljuego.pe/email_assets/generadas/' . uniqid('confirmacion_') . '.png';

// --- PROCESO DE CREACIÓN DE IMAGEN ---
$imagen = imagecreatefrompng($rutaImagenBase);
$colorTexto = imagecolorallocate($imagen, 0, 0, 0); // Negro

// Obtenemos el ancho de la imagen para poder centrar el texto
$ancho_imagen = imagesx($imagen);

// --- ✍️ ESCRIBIR EL TEXTO SOBRE LA IMAGEN (CON CENTRADO AUTOMÁTICO) ---

// Función para centrar texto
function centrar_texto($imagen, $tamaño, $angulo, $y, $color, $fuente, $texto) {
    global $ancho_imagen;
    $caja_texto = imagettfbbox($tamaño, $angulo, $fuente, $texto);
    $ancho_texto = $caja_texto[2] - $caja_texto[0];
    $x = ($ancho_imagen - $ancho_texto) / 2;
    imagettftext($imagen, $tamaño, $angulo, $x, $y, $color, $fuente, $texto);
}

// -- AHORA USAMOS LA FUNCIÓN PARA PONER CADA LÍNEA --
// Solo tendrás que ajustar el tamaño y la posición Y (vertical)

$textoSaludo = "Hola " . $nombreCapitan;
centrar_texto($imagen, 20, 0, 400, $colorTexto, $rutaFuente, $textoSaludo);

centrar_texto($imagen, 48, 0, 480, $colorTexto, $rutaFuente, "¡Felicitaciones!");

centrar_texto($imagen, 16, 0, 560, $colorTexto, $rutaFuente, "Tu inscripción para TOMA EL JUEGO");
centrar_texto($imagen, 16, 0, 590, $colorTexto, $rutaFuente, "el día 30 de agosto a las 10 horas");
centrar_texto($imagen, 16, 0, 620, $colorTexto, $rutaFuente, "fue recibida.");

centrar_texto($imagen, 16, 0, 690, $colorTexto, $rutaFuente, "Nos pondremos en contacto contigo por");
centrar_texto($imagen, 16, 0, 720, $colorTexto, $rutaFuente, "WhatsApp para darte los pasos a seguir.");

centrar_texto($imagen, 14, 0, 790, $colorTexto, $rutaFuente, "El equipo de Nike Fútbol");


// Guardar la nueva imagen y liberar memoria
imagepng($imagen, str_replace('https://tomaeljuego.pe', __DIR__, $urlImagenGenerada));
imagedestroy($imagen);

// --- PROCESO DE ENVÍO DE CORREO ---
$mensaje = "
<html><body>
  <p>Hola " . htmlspecialchars($nombreCapitan) . ", gracias por registrarte.</p>
  <p>Si no puedes ver la imagen de confirmación abajo, por favor activa la opción 'Mostrar imágenes' en tu correo.</p>
  <img src='" . $urlImagenGenerada . "' alt='Confirmación de Registro'>
</body></html>
";

$cabeceras = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: Toma el Juego <info@tomaeljuego.pe>',
    'Reply-To: info@tomaeljuego.pe'
];

if (mail($emailCapitan, $asunto, $mensaje, implode("\r\n", $cabeceras))) {
    echo json_encode(['success' => true, 'message' => 'Correo con imagen generada enviado.']);
} else {
    echo json_encode(['success' => false, 'message' => 'El servidor no pudo enviar el correo.']);
}
?>