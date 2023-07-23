import "./UpdateForm.css";
import { useState } from "react";
import { useEffect } from "react";
import { put } from "../../../Fetch.js";
function UpdateForm(props) {
  const [inputs, updateInputs] = useState({ category: false });
  const [checked, updateChecked] = useState(false);
  useEffect(
    function () {
      updateInputs(...props.editObj);
      if (props.editObj[0].exempt) {
        updateChecked(true);
      }
    },
    [props.editObj]
  );
  async function SendUpdatedIncome() {
    let result = await put(
      "http://localhost:8888/FinalProject/FinalProjectPhp/Endpoints/EditIncome.php",
      inputs
    );
  }
  async function SendUpdatedDonation() {
    let result = await put(
      "http://localhost:8888/FinalProject/FinalProjectPhp/Endpoints/EditDonation.php",
      inputs
    );
  }
  return (
    <div class="box">
      <form className="form">
        <label class="header-container" for="date">
          Date
        </label>
        <input
          value={inputs.date}
          type="date"
          name="date"
          id="date"
          placeholder={new Date().getDate()}
          onChange={(e) =>
            updateInputs(function (prev) {
              return {
                ...prev,
                date: e.target.value,
              };
            })
          }
        ></input>

        <label class="header-container" for="company">
          Company Name
        </label>
        <input
          value={inputs.companyName}
          type="text"
          name="company"
          id="company"
          onChange={(e) =>
            updateInputs(function (prev) {
              return { ...prev, companyName: e.target.value };
            })
          }
        ></input>

        <label class="header-container" for="amt">
          Amount
        </label>

        <input
          value={inputs.amount}
          type="Number"
          name="amt"
          id="amt"
          onChange={(e) =>
            updateInputs(function (prev) {
              return { ...prev, amount: Number(e.target.value) };
            })
          }
        ></input>
        {props.additionalCategory == "exempt" ? (
          <div className="checkbox-container">
            <span className="checkbox">
              <input
                type="checkbox"
                onClick={(e) => {
                  updateChecked(function (prev) {
                    return !prev;
                  });
                  updateInputs(function (prev) {
                    return { ...prev, category: !prev.category };
                  });
                }}
                checked={checked}
              ></input>
            </span>
            <label class="header-container " for="exempt">
              Exempt from Ma'aser
            </label>
          </div>
        ) : (
          <>
            <label class="header-container" for="category">
              Category
            </label>
            <div class="select">
              <select
                value={inputs.category}
                id="standard-select"
                name="category"
                onChange={(e) =>
                  updateInputs(function (prev) {
                    return {
                      ...prev,
                      category: e.target.value,
                      categoryID: e.target.selectedIndex,
                    };
                  })
                }
              >
                <option>Select Category</option>
                {Object.keys(props.categoryObj).map(function (item) {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            </div>
          </>
        )}
        <input
          type="submit"
          value="ADD"
          onClick={(e) => {
            e.preventDefault();

            if (props.additionalCategory == "exempt") {
              SendUpdatedIncome();
            } else {
              SendUpdatedDonation();
            }

            updateInputs(function (prev) {
              return {
                companyName: "",
                amount: "",
                date: "",
                category: false,
              };
            });
            updateChecked(false);
          }}
        ></input>
        <input
          value="CANCEL"
          type="button"
          onClick={(e) => {
            e.preventDefault();

            updateInputs(function (prev) {
              return {
                companyName: "",
                amount: "",
                date: "",
              };
            });
            updateChecked(false);
          }}
        ></input>
      </form>
    </div>
  );
}

export default UpdateForm;
