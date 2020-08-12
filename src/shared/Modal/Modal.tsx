import React from "react";

import classes from "./Modal.module.css";

import Aux from "../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props: any) => {
  let modalClasses = [classes["modal"]];
  if (props.show) {
    modalClasses.push(classes["showModal"]);
  }
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closeModal} />
      <div className={modalClasses.join(" ")}>{props.children}</div>
    </Aux>
  );
};

export default Modal;
