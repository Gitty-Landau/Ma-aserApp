<?php 
declare(strict_types=1);
include_once("Database.php");

class UserAccount
{
    //Attributes
    private $email;
    private $password;
    private $name;
    private $maaserpercent;
    private $db;
    private $incomeArr;
    private $donationArr;

    //Constructor
    public function __construct(string $email, string $password, string $name, int $maaserPercent, object $db)
    {
        $this->email=$email;
        $this->password=$password;
        $this->name=$name;
        $this->maaserpercent=$maaserPercent;
        $this->db=$db;
       
    }
    //Getters
    public function GetEmail():string
    {
        return  $this->email;
    }
    public function GetPassword():string
    {
        return  $this->password;
    }
    public function GetName():string
    {
        return  $this->name;
    }
    public function GetMaaserPercent():int
    {
        return  $this->maaserpercent;
    }
    public function GetIncomeArr()
    {
        print_r($this->incomeArr);
        return  $this->incomeArr;
    }
    public function GetDonationArr()
    {
        print_r($this->donationArr);
        return  $this->donationArr;
    }
    //Insert
    public function Insert(): int
    {
        $result = $this->db->query("INSERT INTO UserAccount (Email, Password, Name, MaaserPercent) VALUES(?,?,?,?)", [$this->email, $this->password, $this->name, $this->maaserpercent]);
        return $result->insert_id;
    }
   
}




?>