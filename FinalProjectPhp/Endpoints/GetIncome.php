<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include '../Classes/Database.php';
include '../Classes/Income.php';

$db = new Database();
if(isset($_GET['id'])) {
    http_response_code(200);
    $result = $db->query("Select * from Income where UserID = ? And Date >= ? And Date <= ?", [$_GET['id'],$_GET['startDate'],$_GET['endDate']])->get_result();

    $incomeArr = [];

    while($row = $result->fetch_assoc()) {
    $income = new Income($row['CompanyName'], $row['Exempt'], $row['Amount'], $row['Date'],$row['UserID'],$db, $row['IncomeID']);
    $incomeArr[] = $income;
    }

 
   

   echo json_encode($incomeArr);

   

}
else
{
    http_response_code(400);
}




?>