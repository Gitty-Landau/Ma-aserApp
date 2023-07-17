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

  const incomeHeaderArr = ["Company", "Date", "Amount", "Exempt from Ma'aser"];

  const donationHeaderArr = ["Donations", "Date", "Amount", "Category"];

  const donation1 = {
    key: 0,
    company: "Yad Eliezer",
    date: "Jan 01, 2023",
    amount: 2000,
    category: "Helping the Poor",
  };
  const donation2 = {
    key: 1,
    company: "Kollel Kever Rachel",
    date: "Jan 04,2022",
    amount: 2000,
    category: "Torah Institutions",
  };
  const donation3 = {
    key: 2,
    company: "Likrat Kallah",
    date: "Jan 06,2023",
    amount: 2000,
    category: "Hachnasas Kallah",
  };
  const [payments, updatePayments] = useState([]);
  const [donations, updateDonations] = useState([]);
  const [userId, updateUserId] = useState(1);
  async function loadPayments() {
    try {
      let result = await get(
        "http://localhost:8888/FinalProject/FinalProjectPhp/Endpoints/GetIncome.php/?id=1"
      );

      updatePayments(result);
    } catch (e) {
      console.log(e);
    }
  }
  async function loadDonations() {
    try {
      let result = await get(
        "http://localhost:8888/FinalProject/FinalProjectPhp/Endpoints/GetDonation.php/?id=1"
      );
      updateDonations([...result]);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadPayments();
    loadDonations();
  }, []);
  const labels = [
    {
      category: "Hachnasas Kallah",
      amt: "$8,000.00",
      index: "first",
      color: "#eb7ca6",
    },
    {
      category: "Helping the Poor",
      amt: "$2,130.00",
      index: "second",
      color: "#ffacc8",
    },
    {
      category: "Medical Institutions",
      amt: "$1,510.00",
      index: "third",
      color: "#cc6ff8",
    },
    {
      category: "Torah Institutions",
      amt: "$2,245.00",
      index: "fourth",
      color: "#7c5cfc",
    },
  ];
  function AddPayment(obj) {
    updatePayments(obj);
    updatePayments(function (prev) {
      return prev.map(function (item, index) {
        return { ...item, key: index };
      });
    });
  }
  function AddDonation(obj) {
    updateDonations(obj);
    updateDonations(function (prev) {
      return prev.map(function (item, index) {
        return { ...item, key: index };
      });
    });
  }
  function DeletePayment(obj) {
    updatePayments(function (prev) {
      return prev.filter(function (item) {
        return item.key != obj.key;
      });
    });
  }
  function DeleteDonation(obj) {
    updateDonations(function (prev) {
      return prev.filter(function (item) {
        return item.key != obj.key;
      });
    });
  }

  const ComponentArray = [
    <MainDashBoard
      tabFunc={props.tabFunc}
      categoryArr={labels}
      paymentArr={payments}
      donationsArr={donations}
      incomeHeaderArr={incomeHeaderArr}
      donationHeaderArr={donationHeaderArr}
      updateActiveKey={props.updateActiveKey}
    ></MainDashBoard>,
    <Income
      headerArr={incomeHeaderArr}
      updateArrFunc={AddPayment}
      paymentArr={payments}
      deleteFunc={DeletePayment}
    ></Income>,
    <Donations
      categoryArr={labels}
      headerArr={donationHeaderArr}
      updateArrFunc={AddDonation}
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
