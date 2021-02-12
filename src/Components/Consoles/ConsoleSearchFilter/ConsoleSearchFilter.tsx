import React from "react";
import ConsoleSearchOptions from "../ConsoleSearchOptions/ConsoleSearchOptions";

import classes from "./ConsoleSearchFilter.module.scss";

const ConsoleSearchFilter = (props: any) => {
  return (
    <div className={classes["filter"]}>
      <h2 className={classes["filter__title"]}>Nintendo Consoles</h2>
      <div className={classes["filter__sort"]}>
        <label className={classes["filter__label"]}>Sort</label>
        <select className={classes["filter__select"]}>
          <option>Cheapest</option>
          <option>Expensive</option>
          <option>By Name</option>
          <option>Release Date</option>
        </select>
      </div>
      <div className={classes["filter__show"]}>
        <label className={classes["filter__label"]}>Show</label>
        <select className={classes["filter__select"]}>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
        </select>
        <label htmlFor="numberOfProductPerPage">by page</label>
      </div>
    </div>
  );
};

export default ConsoleSearchFilter;
