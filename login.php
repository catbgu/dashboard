<?PHP
$email = $_GET["email"];
$name = $_GET["name"];

$subject = "Your Invidio account has been created";
$headers = "From: contact@inspiredapp.tv\r\n";
$headers .= "Reply-To: contact@inspiredapp.tv\r\n";
$message = "Hi $name,

Your account has been created.

User ID: $email

Should you have any questions or require additional information, please feel free to contact us using the information below.

Get Inspired!
";

mail($email,$subject,$message,$headers);

header("Location: landing.html");
?>