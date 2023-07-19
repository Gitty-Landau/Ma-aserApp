import "./Income.js";
import History from "../MainDashboard/BCLeft/History/History.js";
import Form from "../Form/Form.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function Income(props) {
  return (
    <div class="bottom-container" id="income">
      <div class="bottom-container__left">
        <History
          headerText={"Income History"}
          tableHeaderArr={props.headerArr}
          donationsArr={props.paymentArr}
          icon={faArrowTrendUp}
          deleteFunc={props.deleteFunc}
        ></History>
      </div>
      <div class="bottom-container__right">
        <Form
          addToDbFunction={props.addToDbFunction}
          donationsArr={props.paymentArr}
          additionalCategory="exempt"
        ></Form>
      </div>
    </div>
  );
}
export default Income;
