import React, { FunctionComponent, useEffect, useState } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import classes from "./ManageConsoles.module.css";
import Aux from "../../hoc/Auxiliary";
import Console from "../../models/ConsoleM";
import * as ConsoleService from "../../service/ConsoleService";
import ConsoleForm from "./ConsoleForm/ConsoleForm";

interface IProps extends RouteComponentProps {
  match: {
    isExact: boolean;
    params: { id: string };
    path: string;
    url: string;
  };
}

const ManageConsoles: FunctionComponent<IProps> = (props) => {
  const [consoles, setConsoleData] = useState<Console[]>();

  useEffect(() => {
    ConsoleService.getConsoles().then((consoles) => {
      setConsoleData(consoles);
    });
  }, []);

  const addGame = (console: Console) => {
    ConsoleService.save(console).then((response) => {
      ConsoleService.getConsoles().then((consoles) => {
        setConsoleData(consoles);
      });
    });
  };

  const manageConsole = (
    manageConsoleOption: string,
    id: number | undefined
  ) => {
    if (manageConsoleOption === "add") {
      props.history.push({
        pathname: props.match.url + "/consoleForm/1",
        search: "type=add&id=0",
      });
    } else if (manageConsoleOption === "update") {
      props.history.push({
        pathname: props.match.url + "/consoleForm/" + id,
        search: "type=update&id=" + id,
      });
    } else {
      if (id) {
        ConsoleService.deleteById(id);
      }
    }
  };

  let consoleRows: JSX.Element[] = [];
  if (consoles) {
    consoleRows = consoles.map((console) => {
      return (
        <tr key={console.id} className={classes["console-row"]}>
          <td>{console.title}</td>
          <td>{console.releaseDate}</td>
          <td>{console.price}</td>
          <td>{console.type}</td>
          <td>{console.condition}</td>
          <td>
            <img src={console.image} />
          </td>
          <td>
            <img src={console.logo} />
          </td>
          <td>
            <button
              className={classes["console-update-btn"]}
              onClick={() => manageConsole("update", console.id)}
            >
              update
            </button>
          </td>
          <td>
            <button
              className={classes["console-delete-btn"]}
              onClick={() => manageConsole("delete", console.id)}
            >
              delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <Aux>
      <div className={classes["manage-consoles-header"]}>
        <h2>Consoles</h2>
      </div>
      <div className={classes["manage-consoles-add-btn-wrapper"]}>
        <button onClick={() => manageConsole("add", 0)}>Add +</button>
      </div>
      <table className={classes["console-table"]}>
        <thead>
          <tr className={classes["console-row"]}>
            <th>Title</th>
            <th>Release Date</th>
            <th>Price</th>
            <th>Type</th>
            <th>Condition</th>
            <th>Image</th>
            <th>Logo</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{consoleRows}</tbody>
      </table>
      <div className={classes["console-form"]}>
        <Route
          path={props.match.url + "/consoleForm/:id"}
          render={() => <ConsoleForm {...props} submit={addGame} />}
        />
      </div>
    </Aux>
  );
};

export default ManageConsoles;
