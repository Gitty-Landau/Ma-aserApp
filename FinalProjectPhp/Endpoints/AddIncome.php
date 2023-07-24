<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, origin, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  header('HTTP/1.1 200 OK');
  exit();
}

include '../Classes/Database.php';
include '../Classes/Income.php';


$db = new Database();
$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

//|| isset($decoded['companyName']) || isset($decoded['amount']) || isset($decoded['date']) || isset($decoded['userID'])

if (!is_array($decoded)) {
  http_response_code(404);
} else {

  $income = new Income($decoded['companyName'], $decoded['exempt'], $decoded['amount'], $decoded['date'], $decoded['userID'], $db);
  $newID = $income->Insert();
  echo json_encode($newID);
  http_response_code(200);
}
