import { Pagination } from "fwt-internship-uikit";
import { useAppSelector } from "../../redux/store";
import styles from "./Pagination.module.scss";

interface IPaginateProps {
  currentPage: number;
  setCurrentPage: (params: number) => void;
}

function Paginate({ currentPage, setCurrentPage }: IPaginateProps) {
  const theme = useAppSelector((state) => state.theme);
  return (
    <div className={styles.wrapper}>
      <Pagination
        className={styles.PaginationPage}
        isDarkTheme={theme === "dark"}
        pagesAmount={3}
        currentPage={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
}

export default Paginate;
