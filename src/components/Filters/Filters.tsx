import { Input, Range } from "fwt-internship-uikit";
import { ChangeEvent, useCallback, useState } from "react";
import { debounce } from "lodash";
import { AnyAction } from "@reduxjs/toolkit";
import styles from "./Filters.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Select from "./Select/Select";
import {
  setChoosenAuthor,
  setChoosenLocation,
  setRangeFrom,
  setRangeTo,
  setSearchValue,
} from "../../redux/slices/filterSlice";
import dataApi from "../../redux/api/dataService";

function Filters() {
  const dispatch = useAppDispatch();
  const { searchValue, choosenAuthor, choosenLocation, rangeFrom, rangeTo } =
    useAppSelector((state) => state.filter);

  const { data: authors, isSuccess: isAuthorsSuccess } =
    dataApi.useGetAuthorsQuery("");
  const { data: locations, isSuccess: isLocationsSuccess } =
    dataApi.useGetLocationsQuery("");

  const theme = useAppSelector((state) => state.theme);

  const [value, setValue] = useState(searchValue);
  const [localRangeFrom, setLocalRangeFrom] = useState(rangeFrom);
  const [localRangeTo, setLocalRangeTo] = useState(rangeTo);

  const deboubceFn = useCallback(
    debounce(
      (str: string, fn: (str: string) => AnyAction) => dispatch(fn(str)),
      300,
    ),
    [],
  );
  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    deboubceFn(e.target.value, setSearchValue);
  };
  const changeRangeFrom = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalRangeFrom(e.target.value);
    deboubceFn(e.target.value, setRangeFrom);
  };
  const changeRangeTo = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalRangeTo(e.target.value);
    deboubceFn(e.target.value, setRangeTo);
  };

  return (
    <div className={styles.container}>
      <Input
        isDarkTheme={theme === "dark"}
        disabled={false}
        placeholder="Name"
        value={value}
        onChange={changeSearchValue}
      />
      <Select
        propsTitle="Author"
        isDarkTheme={theme === "dark"}
        value={choosenAuthor}
        onChange={(id) => dispatch(setChoosenAuthor(id))}
        options={isAuthorsSuccess === true ? authors : []}
      />
      <Select
        propsTitle="Location"
        isDarkTheme={theme === "dark"}
        value={choosenLocation}
        onChange={(id) => dispatch(setChoosenLocation(id))}
        options={
          isLocationsSuccess === true
            ? locations?.map((location) => ({
                id: location.id,
                name: location.location,
              }))
            : []
        }
      />
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore issue with Range props (children)
        <Range
          className={styles.range__container}
          isDarkTheme={theme === "dark"}
          onClose={() => {}}
        >
          <Input
            className="Input__range"
            isDarkTheme={theme === "dark"}
            disabled={false}
            placeholder="from"
            value={localRangeFrom}
            onChange={changeRangeFrom}
          />
          <div className={theme === "dark" ? styles.hr__dark : styles.hr} />
          <Input
            className="Input__range"
            isDarkTheme={theme === "dark"}
            disabled={false}
            placeholder="before"
            value={localRangeTo}
            onChange={changeRangeTo}
          />
        </Range>
      }
    </div>
  );
}

export default Filters;
