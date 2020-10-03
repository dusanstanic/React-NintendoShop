import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions/index";

interface PropsI {
  onLogout: Function;
}

class Logout extends Component<PropsI, {}> {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/home" />;
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: () => dispatch(actionTypes.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
