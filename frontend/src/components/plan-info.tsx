import React from "react";

import "./meal-info.css";
import { RecipeSmall, RecipeInterface } from "./recipe-small";


export interface PlanSummaryInterface {
  recipes: JSX.Element[];
  ingredients: string[];
}
export class PlanInfo extends React.Component<{},PlanSummaryInterface> {

  constructor(props:{}) {
    super(props);

    this.state = {
      recipes: [],
      ingredients: [],
    }
  }


  async componentDidMount() {
    // get the five recipe id's
    const recipeIDs: string[] = [ "52850", "52818" ]
    const ingredients: string[] = [];

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


      for (let i = 1; i <= 20; i ++ ){
        const ingredient: string = "strIngredient"+i;
        if (recipe.ingredient === ""){
          break;
        }
        ingredients.push(recipe[ingredient]);
      }

      return (<RecipeSmall {...recipeInfo}/>);
    }) );

    
    ingredients.sort();

    this.setState({recipes: results, ingredients});


  }

  render() {

    const ingredients = this.state.ingredients.map((i)=>{
     return <p>{i}</p> 
    });

    console.log(ingredients);
    console.log(this.state.ingredients);

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
          {ingredients}
        </div>

        <div className="card-footer">5 % food waste.</div>
      </div>
    );
  }
}
