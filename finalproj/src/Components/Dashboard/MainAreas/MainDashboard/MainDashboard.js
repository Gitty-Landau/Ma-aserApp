import "./MainDashboard.css";
import BCLeft from "./BCLeft/BCLeft";
import BCRight from "./BCRight/BCRight";
import { useState } from "react";
function MainDashBoard(props) {
  function calculateBalance() {
    return totalIncome * 0.1 - totalDonations;
  }
  function calculatePaymentSum() {
    const sum = props.paymentArr.reduce(function (total, val) {
      return total + val.amount;
    }, 0);
    return sum;
  }
  function calculateDonationsSum() {
    const sum = props.donationsArr.reduce(function (total, val) {
      return total + val.amount;
    }, 0);
    return sum;
  }
  const totalIncome = calculatePaymentSum();
  const totalDonations = calculateDonationsSum();
  const balance = calculateBalance();
  return (
    <div class="bottom-container">
      <BCLeft
        totalDonations={totalDonations}
        totalIncome={totalIncome}
        categoryObj={props.categoryObj}
        paymentArr={props.paymentArr}
        donationsArr={props.donationsArr}
        incomeHeaderArr={props.incomeHeaderArr}
        donationHeaderArr={props.donationHeaderArr}
        tabFunc={props.tabFunc}
        updateActiveKey={props.updateActiveKey}
      ></BCLeft>
      <BCRight categoryObj={props.categoryObj} balance={balance}></BCRight>
    </div>
  );
}

export default MainDashBoard;
