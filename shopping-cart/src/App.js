import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";

import "./App.css";
import Menu from "./components/menu";

class App extends Component {
  state = {
    counters: [
      { id: 1, product: "shirt", value: 0 },
      { id: 2, product: "trouser", value: 0 },
      { id: 3, product: "t-shirt", value: 0 },
      { id: 4, product: "shorts", value: 0 },
    ],
    menuClick: true,
  };

  handleTrigger = () => {
    let menuClick = this.state.menuClick;
    menuClick = !menuClick;
    this.setState({ menuClick });
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          onClick={this.handleTrigger}
          trigger={this.state.menuClick}
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        <Menu trigger={this.state.menuClick} />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
