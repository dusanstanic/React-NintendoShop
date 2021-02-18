import React, { Component, MouseEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

import classes from "./ConsolesMain.module.css";

import ConsoleM from "../../shared/models/ConsoleM";

import Aux from "../../hoc/Auxiliary";
import Consoles from "../../Components/Consoles/Consoles";

interface PropsI extends RouteComponentProps<{}> {
  consoles: ConsoleM[];
  selectedConsoles: ConsoleM[];
}

class ConsoleMain extends Component<PropsI, { bannerImage: string }> {
  state = {
    bannerImage: "http://127.0.0.1:8887/Nintendo-Switch%20-%20Banner.jpg",
  };

  enterBannerHandler = (event: MouseEvent<HTMLImageElement>) => {
    this.setState({
      bannerImage:
        "http://127.0.0.1:8887/Nintendo%20Switch%20-%20Banner%202.jpg",
    });
  };

  leaveBannerHandler = (event: MouseEvent<HTMLImageElement>) => {
    this.setState({
      bannerImage: "http://127.0.0.1:8887/Nintendo-Switch%20-%20Banner.jpg",
    });
  };

  render() {
    return (
      <Aux>
        <Consoles {...this.props} />
        {/* <div className={classes["banner-wrapper"]}>
          <div className={classes["banner-info"]}>Details ...</div>
          <img
            className={classes["banner"]}
            alt="consoleBanner"
            src={this.state.bannerImage}
            onMouseEnter={this.enterBannerHandler}
            onMouseLeave={this.leaveBannerHandler}
          />
        </div> */}
      </Aux>
    );
  }
}

export default ConsoleMain;
