import { IAuthor, ILocation } from "../../redux/api/dataService";
import styles from "./Item.module.scss";

interface IItemProps {
  imageUrl: string;
  authorId: number;
  created: string;
  locationId: number;
  name: string;
  authors: IAuthor[];
  locations: ILocation[];
}

function Item({
  authors,
  locations,
  imageUrl,
  authorId,
  created,
  locationId,
  name,
}: IItemProps) {
  const author = authors?.filter((item) => item.id === authorId);
  const location = locations?.filter((item) => item.id === locationId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>
        <p>{name}</p>

        <div className={styles.location}>
          <span>Author:</span>
          {authors.length > 0 && author[0].name}
        </div>
        <div className={styles.location}>
          <span>Created:</span>
          {created}
        </div>
        <div className={styles.location}>
          <span>Location:</span>
          {locations.length > 0 && location[0].location}
        </div>
      </div>

      <img src={`https://test-front.framework.team/${imageUrl}`} alt={name} />
    </div>
  );
}

export default Item;
