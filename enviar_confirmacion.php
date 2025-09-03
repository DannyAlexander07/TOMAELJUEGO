<?php
// Archivo: enviar_confirmacion.php - Versión con TODO el texto del diseño

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

// Rutas en el servidor
$rutaImagenBase = __DIR__ . '/email_assets/emaildeconfirmacion_VF.png';
$rutaFuente = __DIR__ . '/email_assets/fuente.ttf'; // Asegúrate de que el nombre del archivo de fuente sea correcto
$directorioSalida = __DIR__ . '/email_assets/generadas/';

// URL pública para el correo
$nombreUnicoImagen = uniqid('confirmacion_') . '.png';
$urlImagenGenerada = 'https://tomaeljuego.pe/email_assets/generadas/' . $nombreUnicoImagen; // CAMBIA tudominio.com por tu dominio real

// --- PROCESO DE CREACIÓN DE IMAGEN ---

if (!file_exists($rutaImagenBase) || !file_exists($rutaFuente)) {
    echo json_encode(['success' => false, 'message' => 'No se encontró la imagen base o el archivo de fuente en el servidor.']);
    exit;
}

if (!is_dir($directorioSalida)) {
    mkdir($directorioSalida, 0755, true);
}

$imagen = imagecreatefrompng($rutaImagenBase);
$colorTexto = imagecolorallocate($imagen, 0, 0, 0); // Texto color Negro

// --- ✍️ ESCRIBIR EL TEXTO SOBRE LA IMAGEN ---
// ¡ESTA ES LA SECCIÓN QUE DEBERÁS AJUSTAR!
// Cambia los números de X (horizontal), Y (vertical) y el tamaño de la fuente
// hasta que el resultado quede perfecto.

// imagettftext(imagen, tamaño_fuente, ángulo, X, Y, color, ruta_fuente, texto);

$textoSaludo = "Hola " . $nombreCapitan;
imagettftext($imagen, 20, 0, 220, 160, $colorTexto, $rutaFuente, $textoSaludo);

imagettftext($imagen, 48, 0, 130, 240, $colorTexto, $rutaFuente, "¡Felicitaciones!");

imagettftext($imagen, 16, 0, 150, 320, $colorTexto, $rutaFuente, "Tu inscripción para TOMA EL JUEGO");
imagettftext($imagen, 16, 0, 140, 350, $colorTexto, $rutaFuente, "el día 30 de agosto a las 10 horas");
imagettftext($imagen, 16, 0, 200, 380, $colorTexto, $rutaFuente, "fue recibida.");

imagettftext($imagen, 16, 0, 100, 450, $colorTexto, $rutaFuente, "Nos pondremos en contacto contigo por");
imagettftext($imagen, 16, 0, 110, 480, $colorTexto, $rutaFuente, "WhatsApp para darte los pasos a seguir.");

imagettftext($imagen, 14, 0, 190, 550, $colorTexto, $rutaFuente, "El equipo de Nike Fútbol");


// Guardar la nueva imagen y liberar memoria
imagepng($imagen, $directorioSalida . $nombreUnicoImagen);
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