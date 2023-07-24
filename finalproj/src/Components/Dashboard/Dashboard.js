import "./Dashboard.css";
import Header from "./Header/Header";
import MainDashBoard from "./MainAreas/MainDashboard/MainDashboard";
import Income from "./MainAreas/Income/Income";
import Donations from "./MainAreas/Donations/Donations";
import { useState } from "react";
import { put, post, remove, get } from "../Fetch";
import { useEffect } from "react";
import ReactModal from "react-modal";
import LoginForm from "./MainAreas/LoginForm/LoginForm";
function Dashboard(props) {
  //Income

  const incomeHeaderArr = ["Company", "Date", "Amount", "Exempt from Ma'aser"];

  const donationHeaderArr = ["Donations", "Date", "Amount", "Category"];

  const [payments, updatePayments] = useState([]);
  const [donations, updateDonations] = useState([]);
  const [userId, updateUserId] = useState(0);
  const [startDate, updateStartDate] = useState("2023-01-01");
  const [endDate, updateEndDate] = useState("2023-07-19");
  async function loadPayments() {
    try {
      let result = await get(
        `http://localhost/FinalProject/FinalProjectPhp/Endpoints/GetIncome.php/?id=${userId}&startDate=${startDate}&endDate=${endDate}`
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
        `http://localhost/FinalProject/FinalProjectPhp/Endpoints/GetDonation.php/?id=${userId}&startDate=${startDate}&endDate=${endDate}`
      );
      updateDonations(result);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadPayments();
    loadDonations();
  }, [userId]);
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
    if (obj.exempt == true) {
      obj.exempt = 1;
    } else {
      obj.exempt = 0;
    }
    obj.userID = userId;
    console.log(obj);
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
    obj.userID = userId;
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
      <ReactModal
        isOpen={userId == 0}
        contentElement={() => (
          <LoginForm updateUserId={updateUserId}></LoginForm>
        )}
      ></ReactModal>
      <Header
        loadPayments={loadPayments}
        loadDonations={loadDonations}
        startDate={startDate}
        endDate={endDate}
        updateStartDate={updateStartDate}
        updateEndDate={updateEndDate}
      ></Header>
      {ComponentArray[props.displayTab]}
    </main>
  );
}

export default Dashboard;
