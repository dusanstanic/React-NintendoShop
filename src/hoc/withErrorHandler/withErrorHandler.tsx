import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

import classes from "./withErrorHandler.module.css";

import Modal from "../../shared/UI/Modal/Modal";
import Aux from "../Auxiliary";

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {
  return (props: any) => {
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [reqInterceptor, setReqInterceptor] = useState<number>();

    useEffect(() => {
      const reqInterceptor = axios.interceptors.response.use(
        (res: AxiosResponse) => {
          //   console.log("withErrorHandler Success");
          //   console.dir(res);

          return res;
        },
        (res: AxiosError) => {
          console.log("withErrorHandler Error");
          console.dir(res);
          setErrorMessage(res.message);
          setShowModal(true);

          if (res.response) {
            return Promise.reject(res.response.data.errorMessage);
          }

          return Promise.reject("Error");
        }
      );

      setReqInterceptor(reqInterceptor);

      return () => {
        axios.interceptors.response.eject(reqInterceptor);
      };
    }, []);

    const hideModal = () => {
      setShowModal(false);
    };

    return (
      <Aux>
        <WrappedComponent {...props} />
        <Modal show={showModal} closeModal={hideModal}>
          <div className={classes["error"]}>
            <h4>{errorMessage}</h4>
          </div>
        </Modal>
      </Aux>
    );
  };
};

export default withErrorHandler;
