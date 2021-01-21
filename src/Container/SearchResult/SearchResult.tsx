import React, { FunctionComponent, useEffect, useState } from "react";
import { useStore } from "react-redux";
import { RouteComponentProps } from "react-router";
import Aux from "../../hoc/Auxiliary";

import classes from "./SearchResult.module.css";

import Product from "../../models/Product";

interface PropsI extends RouteComponentProps {
  location: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: Product[];
  };
}

function parseQueryStirng(queryString: string) {
  let parsedQueryStirng = queryString.split("?").pop()?.split("&");
  let parsedQueryStirngValues = parsedQueryStirng?.map((query) => {
    return query.split("=")[1];
  });
  return parsedQueryStirngValues;
}

const SearchResult: FunctionComponent<PropsI> = (props) => {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const queryValues = parseQueryStirng(props.location.search);
    let id = 0;
    console.log(queryValues);
    if (queryValues) {
      id = parseInt(queryValues[0]);
    }

    setItems(props.location.state);
  }, [props.history.location]);

  const results = () => {
    const results = items.map((item) => {
      return (
        <div key={item.id} className={classes["product"]}>
          <div className={classes["image-wrapper"]}>
            <img src={item.image} />
          </div>
          <div className={classes["releaseDate"]}>
            Release Date: {item.releaseDate}
          </div>
          <div className={classes["title"]}>{item.title}</div>
          <div className={classes["price-content"]}>
            <div></div>
            <div className={classes["price"]}>{item.price}</div>
            <button></button>
          </div>
        </div>
      );
    });

    return results;
  };

  return (
    <Aux>
      <div className={classes["searchResult"]}>
        <div className={classes["searchOptions"]}>
          <div>Company</div>
        </div>
        <div className={classes["products"]}>{results()}</div>
      </div>
    </Aux>
  );
};

export default SearchResult;
