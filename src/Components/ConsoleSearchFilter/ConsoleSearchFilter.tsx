import React from "react";

import classes from "./ConsoleSearchFilter.module.css";

const ConsoleSearchFilter = (props: any) => {
  console.log("Render ConsoleSearchFilter");
  return (
    <div className={classes["console-search-filter"]}>
      <h2 className={classes["console-search-filter-title"]}>
        Nintendo Consoles
      </h2>
      <div className={classes["console-search-sort-options"]}>
        <label htmlFor="filterOptions">Sort</label>
        <select>
          <option>Cheapest</option>
          <option>Expensive</option>
          <option>By Name</option>
          <option>Release Date</option>
        </select>
      </div>
      <div className={classes["console-search-show-options"]}>
        <label htmlFor="numberOfProductPerPage">Show</label>
        <select>
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
