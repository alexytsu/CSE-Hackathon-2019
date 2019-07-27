import React from "react";
import { RecipeSmall } from "./recipe-small";
import { Button } from "@material-ui/core";
import { string } from "prop-types";

interface ChooseRecipesI {
  addChosen: (id: string) => void;
  category: string;
}

interface ChooseRecipesState {
  recipesWithLinks: RecipeLink[];
}

interface RecipeLink {
  name: string;
  image: string;
  id: string;
}

export class ChooseRecipes extends React.Component<
  ChooseRecipesI,
  ChooseRecipesState
> {
  constructor(props: ChooseRecipesI) {
    super(props);

    this.state = {
      recipesWithLinks: []
    };
  }

  async componentDidMount() {
    const request =
      "https://www.themealdb.com/api/json/v1/1/filter.php?c=" +
      this.props.category;

    const response = await fetch(request);
    const json = await response.json();
    console.log(json);
    const recipes = json.meals;
    const recipeObjs: RecipeLink[] = recipes.map((resp: any) => {
      const { strMeal, strThumb, idMeal } = resp;
      const recipeObj: RecipeLink = {
        id: idMeal,
        image: strThumb,
        name: strMeal
      };
      return recipeObj;
    });

    this.setState({ recipesWithLinks: recipeObjs });
  }

  render() {
    const renderables = this.state.recipesWithLinks.map(recipeLink => {
      return (
        <div>
          <RecipeSmall
            imageURL={recipeLink.image}
            recipeName={recipeLink.name}
            recipeDescription={""}
          />
          <Button onClick={()=>this.props.addChosen(recipeLink.id)} >Add Me</Button>
        </div>
      );
    });

    return <div>{renderables}</div>;
  }
}
