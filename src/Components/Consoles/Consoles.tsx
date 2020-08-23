import React, { useEffect, Component } from "react";

const Consoles = (props: any) => {
  useEffect(() => {
    console.log("Finished Rendering Consoles");
  });

  console.log("Rendering Consoles");
  return (
    <div>
      <h1>Consoles</h1>
    </div>
  );
};

/*
class Consoles extends Component {
  componentDidMount() {
    console.log("Finished Rendering Consoles");
  }

  render() {
    console.log("Rendering Consoles");
    return (
      <div>
        <h1>Consoles</h1>
      </div>
    );
  }
}
*/
export default Consoles;
