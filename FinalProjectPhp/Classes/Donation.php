<?php

declare(strict_types=1);
include_once("Database.php");

class Donation
{
    //Attributes
    public $donationID;
    public $companyName;
    public $amount;
    public $date;
    public $categoryID;
    public $category;
    public $categoryColor;
    public $userID;
    public $db;

    //Constructor
    public function __construct(string $companyName, float $amount, string $date, int $userID, object $db, int $categoryID=0, string $category="", string $categoryColor="", int $donationID=0)
    {
        $this->companyName = $companyName;
        $this->amount = $amount;
        $this->date = $date;
        $this->categoryColor = $categoryColor;
        $this->categoryID = $categoryID;
        $this->category = $category;
        $this->userID = $userID;
        $this->db = $db;
        $this->donationID = $donationID;
    }

    //Getters
    public function  GetCompanyName(): string
    {
        return $this->companyName;
    }
    public function  GetAmount(): float
    {
        return $this->amount;
    }
    public function  GetDate(): string
    {
        return $this->date;
    }
    public function  GetCategoryID(): int
    {
        return $this->categoryID;
    }
    public function  GetUserID(): int
    {
        return $this->userID;
    }
    public function  GetDatabase(): object
    {
        return $this->db;
    }

    //Insert
    public function Insert(): int
    {
        $result = $this->db->query("INSERT INTO Donations (CompanyName, Amount, Date, CategoryID, UserID) VALUES(?,?,?,?,?)", [$this->companyName, $this->amount, $this->date, $this->categoryID, $this->userID]);
        return $result->insert_id;
    }
}
