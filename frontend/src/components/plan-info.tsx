import React from "react";

import "./meal-info.css";
import { RecipeSmall, RecipeInterface } from "./recipe-small";
import { Button } from "@material-ui/core";
import { Receipt } from "./receipt";

export interface PlanSummaryProps {
  recipeIDList: string[];
  refresh: boolean;
}

export interface PlanSummaryInterface {
  recipes: JSX.Element[];
  ingredients: IngredientWithAmount[];
  showPrices: boolean;
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
      showPrices: false
    };
  }

  async componentDidUpdate() {
    if (this.state.refresh != this.props.refresh) {
      const recipeIDs: string[] = this.props.recipeIDList;
      const ingredients: IngredientWithAmount[] = [];
      console.log("updated");
      const refresh = this.props.refresh;
      this.setState({ refresh });
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
        const { strArea, strMeal, strMealThumb, strSource } = recipe;
        const recipeInfo: RecipeInterface = {
          imageURL: strMealThumb,
          recipeName: strMeal,
          recipeDescription: strArea,
          recipeURL: strSource
        };

        for (let i = 1; i <= 20; i++) {
          const ingredientIdx: string = "strIngredient" + i;
          if (recipe[ingredientIdx] === "" || !recipe[ingredientIdx]) {
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

    const key = (a: IngredientWithAmount, b: IngredientWithAmount) => {
      if (a.ingredientName < b.ingredientName) {
        return -1;
      }
      if (a.ingredientName > b.ingredientName) {
        return 1;
      }
      return 0;
    };

    ingredients.sort(key);
    this.setState({ recipes: results, ingredients });
  }

  async componentDidMount() {
    await this.updateData();
    // get the five recipe id's
  }

  convert(amount: string) {
    const amountshits = amount.split(" ");
    if (amountshits.length == 1) {
      return amountshits[0];
    }
    if (amountshits.length == 2) {
      return amount;
    } else return amountshits[0] + amountshits[1];
  }

  togglePrice = () => {
    const opposite = !this.state.showPrices;
    this.setState({ showPrices: opposite });
  };

  render() {
    const shoppingListItems = this.state.ingredients.map(i => {
      return (
        <tr className="ingredient-item">
          <td className="ingredient-name">
            <b>{i.ingredientName}</b>
          </td>
          <td className="ingredient-quantity">{this.convert(i.amount)}</td>
        </tr>
      );
    });

    return (
      <div className="card">
        <h2>Plan Summary</h2>
        <div className="card-body">
          <div className="section">
            <div className="section-header">
              <p>Recipes</p>
            </div>
            <div className="recipe-row">{this.state.recipes}</div>
          </div>
          <div>
            <div className="price-button-container">
              <Button
                onClick={this.togglePrice}
                color={this.state.showPrices ? "primary" : "secondary"}
                variant="contained"
              >
                {this.state.showPrices ? "1-Click Buy" : "Get Prices"}
              </Button>
            </div>
            {this.state.showPrices ? (
              <Receipt ingredients={this.state.ingredients} />
            ) : (
              <div className="ingredients-list">
                <table>{shoppingListItems}</table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
