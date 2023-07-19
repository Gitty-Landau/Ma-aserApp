import "./Dashboard.css";
import Header from "./Header/Header";
import MainDashBoard from "./MainAreas/MainDashboard/MainDashboard";
import Income from "./MainAreas/Income/Income";
import Donations from "./MainAreas/Donations/Donations";
import { useState } from "react";
import { put, post, remove, get } from "../Fetch";
import { useEffect } from "react";
function Dashboard(props) {
  //Income
  const userID = 1;
  const incomeHeaderArr = ["Company", "Date", "Amount", "Exempt from Ma'aser"];

  const donationHeaderArr = ["Donations", "Date", "Amount", "Category"];

  const [payments, updatePayments] = useState([]);
  const [donations, updateDonations] = useState([]);
  const [userId, updateUserId] = useState(1);
  async function loadPayments() {
    try {
      let result = await get(
        "http://localhost/FinalProject/FinalProjectPhp/Endpoints/GetIncome.php/?id=1&startDate=2023-01-01&endDate=2023-07-19"
      );
      result = result.map((element) => {
        return { ...element, category: element.exempt };
      });

      updatePayments(result);
    } catch (e) {
      console.log(e);
    }
  }
  async function loadDonations() {
    try {
      let result = await get(
        "http://localhost/FinalProject/FinalProjectPhp/Endpoints/GetDonation.php/?id=1&startDate=2023-01-01&endDate=2023-07-19"
      );
      updateDonations(result);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadPayments();
    loadDonations();
  }, []);
  const labels = {
    "Hachnasas Kallah": "#eb7ca6",
    "Helping the Poor": "#ffacc8",
    "Medical Institutions": "#cc6ff8",
    "Torah Institutions": "#7c5cfc",
  };

  function AddPayment(obj) {
    updatePayments(function (prev) {
      return [...prev, obj];
    });
    updatePayments(function (prev) {
      return prev.map(function (item, index) {
        return { ...item, key: index };
      });
    });
  }
  function AddDonation(obj) {
    updateDonations(function (prev) {
      return [...prev, obj];
    });
    updateDonations(function (prev) {
      return prev.map(function (item, index) {
        return { ...item, key: index };
      });
    });
  }
  async function SendPaymentToDB(obj) {
    //fetch
    obj.exempt = obj.category.toString();
    obj.userID = userID;

    try {
      const result = await post(
        "http://localhost/FinalProject/FinalProjectPhp/Endpoints/AddIncome.php",
        obj
      );
      obj.incomeID = result;
      AddPayment(obj);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  async function SendDonationToDB(obj) {
    //fetch
    obj.userID = userID;

    try {
      const result = await post(
        "http://localhost/FinalProject/FinalProjectPhp/Endpoints/AddDonation.php",
        obj
      );
      obj.donationID = result;

      AddDonation(obj);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  function DeletePayment(obj) {
    remove(
      "http://localhost/FinalProject/FinalProjectPhp/Endpoints/DeleteIncome.php",
      { IncomeID: obj.incomeID }
    );
    updatePayments(function (prev) {
      return prev.filter(function (item) {
        return item.incomeID != obj.incomeID;
      });
    });
  }
  function DeleteDonation(obj) {
    remove(
      "http://localhost/FinalProject/FinalProjectPhp/Endpoints/DeleteDonation.php",
      { DonationID: obj.donationID }
    );
    updateDonations(function (prev) {
      return prev.filter(function (item) {
        return item.donationID != obj.donationID;
      });
    });
  }

  const ComponentArray = [
    <MainDashBoard
      tabFunc={props.tabFunc}
      categoryObj={labels}
      paymentArr={payments}
      donationsArr={donations}
      incomeHeaderArr={incomeHeaderArr}
      donationHeaderArr={donationHeaderArr}
      updateActiveKey={props.updateActiveKey}
    ></MainDashBoard>,
    <Income
      addToDbFunction={SendPaymentToDB}
      headerArr={incomeHeaderArr}
      paymentArr={payments}
      deleteFunc={DeletePayment}
    ></Income>,
    <Donations
      addToDbFunction={SendDonationToDB}
      categoryObj={labels}
      headerArr={donationHeaderArr}
      donationsArr={donations}
      deleteFunc={DeleteDonation}
    ></Donations>,
  ];

  return (
    <main class="main-content">
      <Header></Header>
      {ComponentArray[props.displayTab]}
    </main>
  );
}

export default Dashboard;
