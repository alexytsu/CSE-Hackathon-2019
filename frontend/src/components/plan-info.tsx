import React from "react";

import "./meal-info.css";
import { RecipeSmall, RecipeInterface } from "./recipe-small";

export interface PlanSummaryProps {
  recipeIDList: string[];
  refresh: boolean;
}

export interface PlanSummaryInterface {
  recipes: JSX.Element[];
  ingredients: IngredientWithAmount[];
  refresh: boolean;
}

export interface IngredientWithAmount {
  ingredientName: string;
  amount: string;
}

export class PlanInfo extends React.Component<
  PlanSummaryProps,
  PlanSummaryInterface
> {
  constructor(props: PlanSummaryProps) {
    super(props);

    this.state = {
      recipes: [], 
      ingredients: [],
      refresh: props.refresh,
    };
  }

  async componentDidUpdate() {
    if(this.state.refresh != this.props.refresh) {
      const recipeIDs: string[] = this.props.recipeIDList;
      const ingredients: IngredientWithAmount[] = [];
      console.log("updated");
      const refresh = this.props.refresh;
      this.setState({refresh});
      this.updateData();

    }



  }

  async updateData() {
    const recipeIDs: string[] = this.props.recipeIDList;
    const ingredients: IngredientWithAmount[] = [];

    const results = await Promise.all(
      recipeIDs.map(async id => {
        const request =
          "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
        const response = await fetch(request);
        const json = await response.json();
        const recipe = json.meals[0];
        console.log(recipe);
        const { strArea, strMeal, strMealThumb } = recipe;
        const recipeInfo: RecipeInterface = {
          imageURL: strMealThumb,
          recipeName: strMeal,
          recipeDescription: strArea
        };

        for (let i = 1; i <= 20; i++) {
          const ingredientIdx: string = "strIngredient" + i;
          if (recipe[ingredientIdx] === "") {
            break;
          }

          const amountIdx: string = "strMeasure" + i;
          const ingredientName = recipe[ingredientIdx].toLowerCase();
          const amount = recipe[amountIdx];

          // if duplicate ingredient, add the amounts
          const found = ingredients
            .map(obj => {
              return obj.ingredientName;
            })
            .indexOf(ingredientName);
          if (found >= 0) {
            ingredients[found].amount += ";" + amount;
          } else {
            ingredients.push({ amount, ingredientName });
          }
        }

        return <RecipeSmall {...recipeInfo} />;
      })
    );

    ingredients.sort();
    this.setState({ recipes: results, ingredients });

  }

  async componentDidMount() {
    await this.updateData();
    // get the five recipe id's
  }

  render() {
    const shoppingListItems = this.state.ingredients.map(i => {
      return (
        <p>
          {i.ingredientName}:{i.amount}
        </p>
      );
    });

    return (
      <div className="card">
        <h2>Plan Summary</h2>
        <div className="section">
          <div className="section-header">
            <p>Recipes</p>
          </div>
          <div className="recipe-row">{this.state.recipes}</div>
        </div>
        {shoppingListItems}
      </div>
    );
  }
}
