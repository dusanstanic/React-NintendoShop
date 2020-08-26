import React, { useEffect, Component } from "react";

const Login = (props: any) => {
  useEffect(() => {
    console.log("Finished Rendering Login");
  });

  console.log("Rendering Login");
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};
/*
class Login extends Component {
  componentDidMount() {
    console.log("Finished Rendering Login");
  }

  render() {
    console.log("Rendering Login");
    return (
      <div>
        <h1>Login</h1>
      </div>
    );
  }
}
*/
export default Login;
