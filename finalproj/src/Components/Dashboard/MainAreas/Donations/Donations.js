import "./Donations.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../Form/Form";
import { useState } from "react";
import UpdateForm from "../UpdateForm/UpdateForm";
import {
  faArrowTrendUp,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";
import History from "../MainDashboard/BCLeft/History/History";
function Donations(props) {
  const [editID, updateEditID] = useState(0);

  return (
    <div class="bottom-container">
      <div class="bottom-container__left">
        <History
          updateEditID={updateEditID}
          categoryObj={props.categoryObj}
          headerText={"Donation History"}
          tableHeaderArr={props.headerArr}
          donationsArr={props.donationsArr}
          icon={faCircleDollarToSlot}
          type="donations"
          seeMoreButton={false}
          deleteFunc={props.deleteFunc}
        ></History>
      </div>
      <div class="bottom-container__right">
        {editID != 0 ? (
          <UpdateForm categoryObj={props.categoryObj}></UpdateForm>
        ) : (
          <Form
            addToDbFunction={props.addToDbFunction}
            categoryObj={props.categoryObj}
            donationsArr={props.donationsArr}
          ></Form>
        )}
      </div>
    </div>
  );
}
export default Donations;
