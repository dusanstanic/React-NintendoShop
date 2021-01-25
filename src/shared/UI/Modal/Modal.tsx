import React, { FunctionComponent } from "react";

import classes from "./Modal.module.css";

import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

interface PropsI {
  show: boolean;
  closeModal: Function;
}

const Modal: FunctionComponent<PropsI> = ({ show, closeModal, children }) => {
  let modalClasses = [classes["modal"]];

  if (show) {
    modalClasses.push(classes["showModal"]);
  }

  return (
    <Aux>
      <Backdrop show={show} clicked={closeModal} />
      <div className={modalClasses.join(" ")}>{children}</div>
    </Aux>
  );
};

export default Modal;
