import React from "react";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import "./App.css";
import { PlanInfo } from "./components/plan-info";

interface AppState {
  recipeIDList: string[];
  refresh: boolean;
  loading: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      recipeIDList: [],
      refresh: false,
      loading: true
    };

    this.addChosen = this.addChosen.bind(this);
  }

  getNewThings = async () => {
    this.setState(
      { loading: true },

      async () => {
        const recipeIDList = [];
        for (let i = 0; i < 5; i++) {
          const url = "https://www.themealdb.com/api/json/v1/1/random.php";
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
          const id = json.meals[0].idMeal;

          recipeIDList.push(id);
        }

        const toggle = !this.state.refresh;
        this.setState({ recipeIDList, refresh: toggle }, () =>
          this.setState({ loading: false })
        );
      }
    );
  };

  async componentDidMount() {
    this.getNewThings();
  }

  render() {
    if (this.state.loading) {
      return "LOADING";
    }

    return (
      <div className="App">
        <div className="container">
          <Button onClick={this.getNewThings} color="primary" variant="outlined">Generate Plan</Button>
          <PlanInfo
            refresh={this.state.refresh}
            recipeIDList={this.state.recipeIDList}
          />
        </div>
      </div>
    );
  }

  addChosen(newId: string) {
    const { recipeIDList } = this.state;
    recipeIDList.push(newId);
    const toggle = !this.state.refresh;
    this.setState({ recipeIDList, refresh: toggle });
  }
}

export default App;
