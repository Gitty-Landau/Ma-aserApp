import "./Trow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../../Button/Button";
function Trow(props) {
  function GetCategoryText(donation) {
    if (donation.category) {
      return donation.category;
    } else {
      return donation.exempt ? "Yes" : "No";
    }
  }
  function Delete() {
    console.log(props.obj);
  }
  return (
    <tr>
      <td>
        <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
        {props.obj.company}
      </td>
      <td>{props.obj.date}</td>
      <td>${props.obj.amount}</td>
      <td>
        <FontAwesomeIcon
          className="point"
          size={"xs"}
          icon={faCircle}
          style={{ color: props.color }}
        />
        {GetCategoryText(props.obj)}
      </td>
      {!props.seeMoreButton ? (
        <>
          <td onClick={() => props.deleteFunc(props.obj)}>
            <Button text="Delete"></Button>
          </td>
          <td>
            <Button text="Update"></Button>
          </td>
        </>
      ) : (
        ""
      )}
    </tr>
  );
}
export default Trow;
