import "./DateRange.css";
import { useState } from "react";
import Button from "../../Button/Button";
function DateRange(props) {
  const [inputs, updateInputs] = useState({
    startDate: props.startDate,
    endDate: props.endDate,
  });
  function updateDate() {
    props.updateStartDate(inputs.startDate);
    props.updateEndDate(inputs.endDate);
    props.loadDonations();
    props.loadPayments();
    console.log(inputs);
  }

  return (
    <div class="user-nav">
      <div class="date">
        <div class="" dates>
          <form class="dates">
            For Dates Between:
            <input
              onChange={(e) => {
                updateInputs(function (prev) {
                  return { ...prev, startDate: e.target.value };
                });
              }}
              type="date"
              value={inputs.startDate}
              required="required"
            />
            <input
              onChange={(e) => {
                updateInputs(function (prev) {
                  return { ...prev, endDate: e.target.value };
                });
              }}
              type="date"
              value={inputs.endDate}
              required="required"
            />
            <div
              onClick={(e) => {
                e.preventDefault();
                updateDate();
              }}
            >
              <Button text="Go"></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default DateRange;
