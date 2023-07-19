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
    $result = $db->query("Select * from Donations INNER JOIN Categories on Categories.CategoryID = Donations.CategoryID where UserID = ? AND Date >= ? And Date <= ?", [$_GET['id'], $_GET['startDate'],$_GET['endDate']])->get_result();

    $donationArr = [];

    while($row = $result->fetch_assoc()) {
    $donation = new Donation($row['CompanyName'], $row['Amount'], $row['Date'],$row['UserID'],$db,$row['CategoryID'], $row['Name'],$row['Color'],$row['DonationID']);
  
    $donationArr[] = $donation;
    }
    echo json_encode($donationArr);
   
 

}
else
{
    http_response_code(400);
}




?>