import "./LabelArea.css";
import Label from "./Label/Label";
function LabelArea(props) {
  return (
    <div class="pie-chart__labels">
      {/* {props.categoryArr.map(function (label) {
        return (
          <Label
            labelColorClass={label.color}
            category={label.category}
            amt={label.amt}
          ></Label>
        );
      })} */}
    </div>
  );
}

export default LabelArea;
