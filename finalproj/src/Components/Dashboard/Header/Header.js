import "./Header.css";
import UserInfo from "./UserInfo/UserInfo";
import DateRange from "./DateRange/DateRange";
function Header(props) {
  return (
    <div class="top-container">
      <DateRange
        loadDonations={props.loadDonations}
        loadPayments={props.loadPayments}
        startDate={props.startDate}
        endDate={props.endDate}
        updateEndDate={props.updateEndDate}
        updateStartDate={props.updateStartDate}
      ></DateRange>
      <UserInfo></UserInfo>
    </div>
  );
}
export default Header;
