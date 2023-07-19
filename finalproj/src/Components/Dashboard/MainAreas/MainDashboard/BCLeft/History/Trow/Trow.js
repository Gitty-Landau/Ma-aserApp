import "./Trow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../../Button/Button";
function Trow(props) {
  console.log(props.color);
  function GetCategoryText(donation) {
    if (donation.category != true && donation.category != false) {
      return donation.category;
    } else {
      return donation.category ? "Yes" : "No";
    }
  }
  function Delete() {}

  return (
    <tr>
      <td>
        <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
        {props.obj.companyName}
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
