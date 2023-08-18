import { useEffect } from "react";
import styles from "./Header.module.scss";
import { setTheme } from "../../redux/slices/themeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

function Header() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);

  const handleChangeTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(next));
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={styles.container}>
      <div>
        <img src="./assets/img/logo.svg" alt="logo" />
      </div>
      <button
        type="button"
        onKeyDown={handleChangeTheme}
        onClick={handleChangeTheme}
      >
        <img
          src={
            theme === "light"
              ? "./assets/img/switcher-dark.svg"
              : "./assets/img/switcher-light.svg"
          }
          alt="switcher"
        />
      </button>
    </div>
  );
}

export default Header;
