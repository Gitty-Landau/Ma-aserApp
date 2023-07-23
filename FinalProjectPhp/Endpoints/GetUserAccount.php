<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include '../Classes/Database.php';
include '../Classes/UserAccount.php';

$db = new Database();
if(isset($_GET['id'])) {
    http_response_code(200);
    $result = $db->query("Select * from UserAccount where UserID = ?", [$_GET['id']])->get_result();

    while($row = $result->fetch_assoc()) {
    $user = new UserAccount($row['Email'], $row['Password'], $row['Name'], $row['MaaserPercent'],$db);
    $userAccountArr[] = $user;
    }

    echo json_encode($userAccountArr);
}
else if(isset($_GET['email']) && isset($_GET['password'] )) {
    http_response_code(200);
    $result = $db->query("Select * from UserAccount where Email = ? AND Password = ?", [$_GET['email'],$_GET['password']])->get_result();

    
    $userIdArr = [];
    while($row = $result->fetch_assoc()) {
    $user = $row['UserID'];
    $userIdArr[] = $user;
    }

    echo json_encode($userIdArr);
}
else
{
    http_response_code(400);
}




?>