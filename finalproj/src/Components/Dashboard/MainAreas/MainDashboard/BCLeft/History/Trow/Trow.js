import "./Trow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../../Button/Button";

function Trow(props) {
  function GetCategoryText(donation) {
    console.log(donation);
    if (props.type == "donations") {
      return donation.category;
    } else {
      return donation.exempt == true ? "Yes" : "No";
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
            icon={props.obj.exempt == 1 ? faCheck : faXmark}
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
                ? props.updateEditID(props.obj.donationID)
                : props.updateEditID(props.obj.incomeID);
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
