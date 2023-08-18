import { useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import classNames from "classnames";
import useOutsideClick from "../../../hooks/useOutsideClick";
import styles from "./Select.module.scss";
import "./SimpleBar.scss";

interface IOption {
  id: number;
  name: string;
}

interface ISelect {
  options: IOption[];
  isDarkTheme: boolean;
  propsTitle: string;
  value: string;
  onChange: (value: string) => void;
}

function Select({
  options,
  isDarkTheme,
  value,
  onChange,
  propsTitle,
}: ISelect) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(propsTitle);
  const ref = useRef(null);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  useOutsideClick(ref, toggleOpen);

  return (
    <div
      ref={isOpen ? ref : null}
      className={classNames(
        styles.select,
        isOpen && styles.select__open,
        isDarkTheme && styles.select__dark,
      )}
      onClick={toggleOpen}
      aria-hidden="true"
    >
      <span className={styles.select__title}>{title}</span>
      {value !== "" && (
        <button
          onKeyDown={() => {
            onChange("");
            setTitle(propsTitle);
          }}
          onClick={() => {
            onChange("");
            setTitle(propsTitle);
          }}
          type="button"
        >
          <img
            src="./assets/img/clear.svg"
            alt="clear"
            className={styles.select__clear}
          />
        </button>
      )}
      {isOpen && options && (
        <ul
          className={classNames(
            styles.select__optionContainer,
            isOpen && styles.select__optionContainer__open,
            isDarkTheme && styles.select__optionContainer__dark,
          )}
        >
          <SimpleBar style={{ maxHeight: "inherit" }}>
            {options.map((option) => (
              <li
                onClick={() => {
                  onChange(option.id.toString());
                  setTitle(option.name);
                }}
                className={classNames(
                  styles.select__option,
                  isDarkTheme && styles.select__option__dark,
                )}
                key={option.id}
                aria-hidden="true"
              >
                <p className={styles.select__optionName}>{option.name}</p>
              </li>
            ))}
          </SimpleBar>
        </ul>
      )}
    </div>
  );
}

export default Select;
