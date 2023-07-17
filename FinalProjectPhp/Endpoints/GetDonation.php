<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include '../Classes/Database.php';
include '../Classes/Donation.php';

$db = new Database();
if(isset($_GET['id'])) {
    http_response_code(200);
    $result = $db->query("Select * from Donations INNER JOIN Categories on Categories.CategoryID = Donations.CategoryID where UserID = ?", [$_GET['id']])->get_result();

    $donationArr = [];

    while($row = $result->fetch_assoc()) {
    $donation = new Donation($row['CompanyName'], $row['Amount'], $row['Date'], $row['Name'],$row['Color'],$row['UserID'],$db);
    $donationArr[] = $donation;
    }
    echo json_encode($donationArr);
   
 

}
else
{
    http_response_code(400);
}




?>