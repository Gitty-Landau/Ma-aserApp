<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include '../Classes/Database.php';
include '../Classes/Donation.php';

$db = new Database();
/* Receive the RAW post data. */
$content = trim(file_get_contents("php://input"));


/* $decoded can be used the same as you would use $_POST in $.ajax */
$decoded = json_decode($content, true);

if(!is_array($decoded))
  die(json_encode([
    'value' => 0,
    'error' => 'Received JSON is improperly formatted',
    'data' => null,
  ]));

 //check that sent information is correct
 //check that recipe exists


$result = $db->query("UPDATE Donations set CompanyName = ?, Amount = ?, Date = ? , Category =  ?  WHERE DonationID = ?", [$decoded['companyName'], $decoded['amount'], $decoded['date'], $decoded['category'],$decoded['donationID']]);


http_response_code(200);
echo json_encode(['message' => 'Donation updated successfully']);



?>