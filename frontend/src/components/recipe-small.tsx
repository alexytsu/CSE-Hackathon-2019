import React from "react";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";

import "./recipe.css";
import { getThemeProps } from "@material-ui/styles";

export interface RecipeInterface {
  imageURL: string;
  recipeName: string;
  recipeDescription: string;
}

export const RecipeSmall: React.FC<RecipeInterface> = (props) => {
  return (
    <div className="recipe-small">
      <img className="recipe-image" src={props.imageURL}></img>
      <div className="recipe-info">
          <div className="recipe-name">{props.recipeName}</div>
          <div className="recipe-description">{props.recipeDescription}</div>
      </div>
    </div>
  );
};
