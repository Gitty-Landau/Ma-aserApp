import "./History.css";
import Button from "../../../../Button/Button";
import Trow from "./Trow/Trow";

function History(props) {
  function GetColor(donation) {
    if (props.type == "donations") {
      return donation.categoryColor;
    } else {
      console.log(donation.exempt);
      return donation.exempt ? "#ffacc8" : "#a1a9fe";
    }
  }

  return (
    <div class="box transaction-box">
      <div class="header-container">
        <h3 class="section-header">{props.headerText}</h3>
      </div>
      <table class="transaction-history">
        <tr>
          {props.tableHeaderArr.map(function (header) {
            return <th>{header}</th>;
          })}
        </tr>
        {props.donationsArr.map(function (donation, index) {
          return (
            <Trow
              seeMoreButton={props.seeMoreButton}
              icon={props.icon}
              obj={donation}
              color={GetColor(donation)}
              deleteFunc={props.deleteFunc}
            ></Trow>
          );
        })}
      </table>
      {props.seeMoreButton ? (
        <div
          class="footer-container "
          onClick={function () {
            if (props.type == "income") {
              props.tabFunc(1);
              props.updateActiveKey(1);
            }
            if (props.type == "donations") {
              props.tabFunc(2);
              props.updateActiveKey(2);
            }
          }}
        >
          <Button text="See More..."></Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default History;
