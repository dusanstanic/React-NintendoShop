import React, { Component, createRef, RefObject } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import classes from "./Consoles.module.scss";

import ConsoleM from "../../models/ConsoleM";

import Aux from "../../hoc/Auxiliary";
import Console from "./Console/Console";
import ConsoleSearchOptions from "./ConsoleSearchOptions/ConsoleSearchOptions";
import ConsoleSearchFilter from "./ConsoleSearchFilter/ConsoleSearchFilter";

interface PropsI extends RouteComponentProps<{}> {
  consoles: ConsoleM[];
  selectedConsoles: ConsoleM[];
}

interface StateI {
  range: number;
  showComponent: boolean;
}

class Consoles extends Component<PropsI, StateI> {
  constructor(props: PropsI) {
    super(props);
  }

  state = {
    range: 8,
    showComponent: false,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.scrollHandler);
    window
      .matchMedia("(max-width: 56.25em)")
      .addEventListener("change", this.screenSizeHandler);

    this.screenSizeHandler(window.matchMedia("(max-width: 56.25em)"));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
    window.removeEventListener("change", this.screenSizeHandler);
  }

  scrollHandler = (event: any) => {
    const distanceToBottom = document.body.getBoundingClientRect().bottom;

    if (distanceToBottom < document.documentElement.clientHeight + 100) {
      this.setState({ range: this.state.range + 4 });
    }
  };

  screenSizeHandler = (event: any) => {
    if (event.matches) {
      this.setState({ showComponent: true });
    } else {
      this.setState({ showComponent: false });
    }
  };

  getRenderedConsoles = () => {
    const { selectedConsoles } = this.props;

    const consoles = selectedConsoles
      .slice(0, this.state.range)
      .map((console) => <Console key={console.id} console={console} />);

    return consoles;
  };

  render() {
    return (
      <Aux>
        <div className={classes["consoles"]} onScroll={this.scrollHandler}>
          <div className={classes["consoles__search-filter"]}>
            <ConsoleSearchFilter />
          </div>

          <div className={classes["consoles__search-options"]}>
            {this.state.showComponent ? "" : <ConsoleSearchOptions />}
          </div>

          <div className={classes["search"]}>
            <input
              type="checkbox"
              id="search__options"
              className={classes["search__input"]}
            />
            <label
              htmlFor="search__options"
              className={classes["search__label"]}
            >
              <span className={classes["search__icon"]}></span>
            </label>
            <div className={classes["search__background"]}></div>
            <div className={classes["search__main"]}>
              {this.state.showComponent ? <ConsoleSearchOptions /> : ""}
            </div>
          </div>

          <div className={classes["consoles__consoles"]}>
            {this.getRenderedConsoles()}
          </div>
        </div>
      </Aux>
    );
  }
}

const mapStateToProp = (state: any) => {
  return {
    consoles: state.consoleData.consoles,
    selectedConsoles: state.consoleDisplay.selectedConsoles,
  };
};

export default connect(mapStateToProp, null)(Consoles);

// console.log(document.documentElement.clientHeight);
// const distanceToBottom = document.body.getBoundingClientRect();
// console.log(distanceToBottom);
