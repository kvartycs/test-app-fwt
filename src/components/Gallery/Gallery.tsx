import { useAppSelector } from "../../redux/store";
import styles from "./Gallery.module.scss";
import Item from "../Item/Item";
import dataApi from "../../redux/api/dataService";

interface IGalleryProps {
  currentPage: number;
}

function Gallery({ currentPage }: IGalleryProps) {
  const { searchValue, choosenAuthor, choosenLocation, rangeFrom, rangeTo } =
    useAppSelector((state) => state.filter);
  const { data: items } = dataApi.useGetPaintingsQuery({
    currentPage,
    searchValue,
    choosenAuthor,
    choosenLocation,
    rangeFrom,
    rangeTo,
  });
  const { data: authors, isSuccess: isAuthorsSuccess } =
    dataApi.useGetAuthorsQuery("");
  const { data: locations, isSuccess: isLocationsSuccess } =
    dataApi.useGetLocationsQuery("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {items &&
          items.map((item) => (
            <Item
              authors={isAuthorsSuccess === true ? authors : []}
              locations={isLocationsSuccess === true ? locations : []}
              imageUrl={item.imageUrl}
              name={item.name}
              key={item.id}
              authorId={item.authorId}
              created={item.created}
              locationId={item.locationId}
            />
          ))}
      </div>
    </div>
  );
}

export default Gallery;
