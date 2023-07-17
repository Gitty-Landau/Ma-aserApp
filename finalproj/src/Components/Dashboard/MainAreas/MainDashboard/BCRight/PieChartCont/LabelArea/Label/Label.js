import "./Label.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
function Label(props) {
  return (
    <div class="pie-chart__labels-item">
      <div class="label">
        <FontAwesomeIcon
          className="point"
          size={"xs"}
          icon={faCircle}
          style={{ color: props.labelColorClass }}
        />

        {props.category}
      </div>
      {props.amt}
    </div>
  );
}
export default Label;
