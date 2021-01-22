import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";

import classes from "./SearchBar.module.css";

import * as GameService from "../../../service/GamesService";
import * as ConsoleService from "../../../service/ConsoleService";
import { NavLink } from "react-router-dom";

interface PropsI {
  setIsSearchClicked: Function;
}

const SearchBar: FunctionComponent<PropsI> = ({ setIsSearchClicked }) => {
  const [searchOptions, setSearchOptions] = useState<JSX.Element[]>([]);
  const [searchOptionsViews, setSearchOptionsViews] = useState<JSX.Element[]>(
    []
  );
  const searchInput = useRef<HTMLInputElement>(null);

  const search = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;
    const games = await GameService.getAllGamesContaining(inputValue);
    const consoles = await ConsoleService.getAllConsolesContaining(inputValue);

    if (!games && !consoles) {
      setSearchOptionsViews([]);
      setSearchOptions([]);
      return;
    }

    const searchJSX: JSX.Element[] = [];
    const viewJSX: JSX.Element[] = [];

    const check = (arr: any[], type: string, key: number) => {
      searchJSX.push(
        <NavLink
          to={{
            pathname: "/searchResults",
            state: [...arr],
          }}
        >
          <div key={key} className={classes["option"]}>
            {inputValue} in {type}
          </div>
        </NavLink>
      );

      viewJSX.push(
        ...arr.map((item) => {
          return (
            <NavLink
              to={{
                pathname: "/searchResults",
                state: [item],
              }}
            >
              <div key={item.id} className={classes["optionView"]}>
                <img src={item.image} alt="option" />
                <div>{item.title}</div>
              </div>
            </NavLink>
          );
        })
      );
    };

    if (games && games.length) {
      check(games, "game", 1);
    }

    if (consoles && consoles.length) {
      check(consoles, "console", 2);
    }

    setSearchOptions(searchJSX);
    setSearchOptionsViews(viewJSX);
  };

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  return (
    <div className={classes["search"]}>
      <input
        ref={searchInput}
        type="text"
        name="search"
        onChange={search}
        // onBlur={() => {
        //   setIsSearchClicked(false);
        // }}
      />
      <span onClick={() => setIsSearchClicked(false)}>X</span>
      {searchOptions.length ? (
        <div className={classes["options"]}>
          <div className={classes["optionColumn"]}>{searchOptions}</div>
          <div className={classes["optionViewColumn"]}>
            {searchOptionsViews}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
