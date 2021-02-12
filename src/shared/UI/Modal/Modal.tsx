import React, { FunctionComponent } from "react";
import { CSSTransition } from "react-transition-group";

import classes from "./Modal.module.scss";

import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

interface PropsI {
  show: boolean;
  closeModal: Function;
}

const animationTiming = {
  enter: 1000,
  exit: 1000,
};

const Modal: FunctionComponent<PropsI> = ({ show, closeModal, children }) => {
  return (
    <Aux>
      <Backdrop show={show} clicked={closeModal} />
      <CSSTransition
        in={show}
        timeout={animationTiming}
        classNames={{
          enterActive: classes["showModal"],
          exitActive: classes["hideModal"],
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes["modal"]}>{children}</div>
      </CSSTransition>
    </Aux>
  );
};

export default Modal;
