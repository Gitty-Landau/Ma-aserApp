import "./BCLeft.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";
import TotalContainer from "./TotalContainer/TotalContainer";
import History from "./History/History";
import { useState } from "react";

function BCLeft(props) {
  return (
    <div class="bottom-container__left">
      <TotalContainer
        totalDonations={props.totalDonations}
        totalIncome={props.totalIncome}
      ></TotalContainer>

      <History
        tabFunc={props.tabFunc}
        categoryObj={props.categoryObj}
        headerText={"Donation History"}
        tableHeaderArr={props.donationHeaderArr}
        donationsArr={props.donationsArr}
        icon={faCircleDollarToSlot}
        type="donations"
        seeMoreButton={true}
        updateActiveKey={props.updateActiveKey}
      ></History>
      <History
        tabFunc={props.tabFunc}
        categoryObj={props.categoryObj}
        headerText={"Income History"}
        tableHeaderArr={props.incomeHeaderArr}
        donationsArr={props.paymentArr}
        icon={faArrowTrendUp}
        type="income"
        seeMoreButton={true}
        updateActiveKey={props.updateActiveKey}
      ></History>
    </div>
  );
}

export default BCLeft;
