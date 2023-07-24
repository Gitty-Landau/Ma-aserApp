import "./LoginForm.css";
import { useState } from "react";
import { get } from "../../../Fetch";
function LoginForm(props) {
  const [inputs, updateInputs] = useState({});
  async function GetUser() {
    let result = await get(
      `http://localhost/FinalProject/FinalProjectPhp/Endpoints/GetUserAccount.php/?email=${inputs.email}&password=${inputs.password}`
    );
    props.updateUserId(result[0]);
  }
  return (
    <div class="box">
      <form className="form">
        <label class="header-container" for="email">
          Email
        </label>
        <input
          value={inputs.email}
          type="email"
          name="email"
          id="email"
          onChange={(e) =>
            updateInputs(function (prev) {
              return {
                ...prev,
                email: e.target.value,
              };
            })
          }
        ></input>
        <label class="header-container" for="password">
          Password
        </label>
        <input
          value={inputs.password}
          type="password"
          name="password"
          id="password"
          onChange={(e) =>
            updateInputs(function (prev) {
              return {
                ...prev,
                password: e.target.value,
              };
            })
          }
        ></input>
        <input
          type="submit"
          value="Login"
          onClick={(e) => {
            e.preventDefault();
            GetUser();
          }}
        ></input>
      </form>
    </div>
  );
}

export default LoginForm;
