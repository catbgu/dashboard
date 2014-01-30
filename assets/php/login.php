<?PHP
$email = $_GET["email"];
$name = $_GET["name"];


$subject = "Your Invidio account has been created";
$headers = "From: contact@inspiredapp.tv <contact@inspiredapp.tv>\r\n";
$headers .= "Reply-To: InspiredApp Contact <contact@inspiredapp.tv>\r\n";
$headers .= "Return-Path: InspiredApp Contact <contact@inspiredapp.tv>\r\n";
$headers .= "X-Mailer: PHP". phpversion() ."\n";
$headers .= "MIME-Version: 1.0\r\n";
$message = "Hi $name,

Your account has been created.

User ID: $email

Should you have any questions or require additional information, please feel free to contact us using the information below.

Get Inspired!
";

mail($email,$subject,$message,$headers, "-f contact@inspiredapp.tv");


header("Location: ../../landing.html");

?>