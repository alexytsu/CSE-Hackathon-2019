import React from "react";

import "./meal-info.css";
import { RecipeSmall, RecipeInterface } from "./recipe-small";
import { jsxAttribute, jsxElement, isJSXElement } from "@babel/types";


export interface PlanSummaryInterface {
  recipes: JSX.Element[];
}
export class PlanInfo extends React.Component<{},PlanSummaryInterface> {

  constructor(props:{}) {
    super(props);

    this.state = {
      recipes: [],
    }
  }


  async componentDidMount() {
    // get the five recipe id's
    const recipeIDs: string[] = [ "52850", "52818" ]

    const results = await Promise.all( recipeIDs.map(async (id) => {
      
      const request = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
      const response = await fetch(request);
      const json = await response.json();
      const recipe = json.meals[0];
      console.log(recipe);
      const {strArea, strMeal, strMealThumb} = recipe;
      const recipeInfo: RecipeInterface = {
        imageURL: strMealThumb,
        recipeName: strMeal,
        recipeDescription: strArea,
      }

      return (<RecipeSmall {...recipeInfo}/>);
    }) );


    this.setState({recipes: results});


  }

  render() {
    return (
      <div className="card">
        <h2>Plan Summary</h2>
        <div className="section">
          <div className="section-header">
            <p>Recipes</p>
          </div>
          <div className="recipe-row">
            {this.state.recipes}
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
  }
}
