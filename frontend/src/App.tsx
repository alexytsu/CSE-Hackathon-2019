import React from "react";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import "./App.css";
import { PlanInfo } from "./components/plan-info";
import { ChooseRecipes } from "./components/choose-recipe";

const getCategoriesRequest =
"https://www.themealdb.com/api/json/v1/1/list.php?c=list";

interface AppState {
  recipeIDList: string[];
  refresh: boolean;
}

class App extends React.Component <{}, AppState>{

  constructor(props:{}) {
    super(props);
    this.state = {
      recipeIDList: [],
      refresh: false,
    }

    this.addChosen = this.addChosen.bind(this);
  }


  render() {

    console.log("APP stuff", this.state.recipeIDList);

    return (
      <div className="App">
        <ChooseRecipes category="Chicken" addChosen={this.addChosen}></ChooseRecipes>
        <PlanInfo refresh={this.state.refresh} recipeIDList={this.state.recipeIDList} />
      </div>
    );

  }

  addChosen(newId: string) {
    const {recipeIDList} = this.state;
    recipeIDList.push(newId);
    const toggle = !this.state.refresh;
    this.setState({recipeIDList, refresh: toggle});
  }
};

export default App;
