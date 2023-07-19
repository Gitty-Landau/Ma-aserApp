import "./Trow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../../Button/Button";
import Income from "../../../../Income/Income";

function Trow(props) {
  console.log(props);
  function GetCategoryText(donation) {
    if (donation.category != true && donation.category != false) {
      return donation.category;
    } else {
      return donation.category ? "Yes" : "No";
    }
  }
  return (
    <tr>
      <td>
        <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
        {props.obj.companyName}
      </td>
      <td>{props.obj.date}</td>
      <td>${props.obj.amount}</td>
      <td>
        {props.type == "donations" ? (
          <FontAwesomeIcon
            className="point"
            size={"xs"}
            icon={faCircle}
            style={{ color: props.categoryObj[props.obj.category] }}
          />
        ) : (
          <FontAwesomeIcon
            className="point"
            icon={props.obj.exempt ? faCheck : faXmark}
          />
        )}

        {GetCategoryText(props.obj)}
      </td>
      {!props.seeMoreButton ? (
        <>
          <td onClick={() => props.deleteFunc(props.obj)}>
            <Button text="Delete"></Button>
          </td>
          <td
            onClick={() => {
              props.type == "donations"
                ? props.updateEditID(props.donationID)
                : props.updateEditID(props.incomeID);
            }}
          >
            <Button text="Edit"></Button>
          </td>
        </>
      ) : (
        ""
      )}
    </tr>
  );
}
export default Trow;
