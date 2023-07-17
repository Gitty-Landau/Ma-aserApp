<?php 
declare(strict_types=1);
include_once("Database.php");

class Income
{
    //Attributes
    public $companyName;
    public $exempt;
    public $amount;
    public $date;
    public $userID;
    public $db;
    //Constructor
    public function __construct(string $companyName, bool $exempt, float $amount, string $date, int $userID, object $db)
    {
        $this->companyName=$companyName;
        $this->exempt=$exempt;
        $this->amount=$amount;
        $this->date=$date;
        $this->userID=$userID;
        $this->db=$db;
    }
    //Getters
    public function GetCompanyName():string{
        return $this->companyName;
    }
    public function GetExempt():bool{
        return $this->exempt;
    }
    public function GetAmount():float{
        return $this->amount;
    }
    public function GetDate():string{
        return $this->date;
    }
    public function GetUserID():int{
        return $this->userID;
    }
    //Insert
    public function Insert(): int
    {
        $result = $this->db->query("INSERT INTO Income (CompanyName, Exempt, Amount, Date, UserID) VALUES(?,?,?,?,?)", [$this->companyName, $this->exempt, $this->amount, $this->date, $this->userID]);
        return $result->insert_id;
    }
}
?>