import "./App.css";
import { Component } from "react";
import { CardList } from "./component/cardList/CardList";
import { SearchBox } from "./component/searchBox/SearchBox";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  onChangeHandler = (e) => {
    this.setState({ searchField: e.target.value });
  };

  componentDidMount() {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }
  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name
        .toLowerCase()
        .includes(searchField.toLocaleLowerCase());
    });
    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          onChange={this.onChangeHandler}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
