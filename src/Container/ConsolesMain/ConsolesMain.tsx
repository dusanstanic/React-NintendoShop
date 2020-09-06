import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import classes from "./ConsolesMain.module.css";

import ConsoleM from "../../models/ConsoleM";

import Aux from "../../hoc/Auxiliary";
import Consoles from "../../Components/Consoles/Consoles";

interface PropsI extends RouteComponentProps<{}> {
  consoles: ConsoleM[];
}

class ConsoleMain extends Component<PropsI, {}> {
  render() {
    return (
      <Aux>
        <Consoles {...this.props} />
        <div className={classes["banner-wrapper"]}>
          <div className={classes["banner-info"]}>Details ...</div>
          <img
            className={classes["banner"]}
            alt="consoleBanner"
            src={"http://127.0.0.1:8887/Nintendo-Switch%20-%20Banner.jpg"}
          />
        </div>
      </Aux>
    );
  }
}

export default ConsoleMain;
