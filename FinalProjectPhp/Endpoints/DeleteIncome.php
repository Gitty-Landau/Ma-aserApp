<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../Classes/Income.php';
include_once '../Classes/Database.php';
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
  }

$db = new Database();
$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

if(!is_array($decoded) || empty($decoded['IncomeID'])){
    http_response_code(200);
echo json_encode(['message' => 'Some information is missing']); 
}
else{

$result = $db->query("Delete from Income where IncomeID = ?", [$decoded['IncomeID']]);

http_response_code(200);
echo json_encode(['message' => 'user deleted successfully']);
}
 ?>