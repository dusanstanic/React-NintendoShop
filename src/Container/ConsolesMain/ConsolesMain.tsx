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
      </Aux>
    );
  }
}

export default ConsoleMain;
