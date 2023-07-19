import "./Income.js";
import History from "../MainDashboard/BCLeft/History/History.js";
import Form from "../Form/Form.js";
import UpdateForm from "../UpdateForm/UpdateForm.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Income(props) {
  const [editID, updateEditID] = useState(0);

  const obj = props.paymentArr.filter(function (payment) {
    return payment.incomeID == editID;
  });

  const editObj = obj[0];
  console.log(editID);
  return (
    <div class="bottom-container" id="income">
      <div class="bottom-container__left">
        <History
          updateEditID={updateEditID}
          headerText={"Income History"}
          tableHeaderArr={props.headerArr}
          donationsArr={props.paymentArr}
          icon={faArrowTrendUp}
          deleteFunc={props.deleteFunc}
        ></History>
      </div>
      <div class="bottom-container__right">
        {editID != 0 ? (
          <UpdateForm obj={editObj} additionalCategory="exempt"></UpdateForm>
        ) : (
          <Form
            addToDbFunction={props.addToDbFunction}
            donationsArr={props.paymentArr}
            additionalCategory="exempt"
          ></Form>
        )}
      </div>
    </div>
  );
}
export default Income;
