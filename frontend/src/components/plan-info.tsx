import React from "react";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";

import "./meal-info.css";

export const PlanInfo: React.FC = () => {
  return (
    <div className="card">
      <h2>Plan Summary</h2>
      <div className="section">
        <div className="section-header">
          <p>Recipes</p>
        </div>
        <div className="recipe-row">
          <p>Beef Stroganoff</p>
          <p>Beef Lasagna</p>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <p>Ingredients</p>
        </div>
        <table>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
          </tr>
          <tr>
            <td>Carrots</td>
            <td>1 pack</td>
          </tr>
          <tr>
            <td>Beef Mince</td>
            <td>0.5 kg</td>
          </tr>
        </table>
      </div>

      <div className="card-footer">5 % food waste.</div>
    </div>
  );
};
