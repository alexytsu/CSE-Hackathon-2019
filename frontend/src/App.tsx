import React from "react";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import "./App.css";
import { PlanInfo } from "./components/plan-info";


const App: React.FC = () => {
  return (
    <div className="App">
      <Button>Chicken</Button>
      <Button>Beef</Button>
      <Button>Vegetarian</Button>
      <PlanInfo></PlanInfo>
    </div>
  );
};

export default App;
