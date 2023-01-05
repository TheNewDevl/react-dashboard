import style from "./KeyDataCard.module.scss";
import PropTypes from "prop-types";

interface KeyDataCardProps {
  image: string;
  title: string;
  value: string;
}

/**
 * @component KeyDataCard component
 * @param {object} props - The props of the component
 * @param {string} props.image - The icon image to display ( Must be a valid path to the img src attribute)
 * @param {string} props.title - The legend of the card
 * @param {string} props.value - The value to display
 * @return {JSX.Element}
 * @example
 * <KeyDataCard image="./Calories.png" title="Calories" value="1,200kCal" />
 */
export const KeyDataCard = ({ image, title, value }: KeyDataCardProps) => {
  return (
    <div className={style.KeyDataCard}>
      <div className={style.img_container}>
        <img src={image} alt={`icon of ${title}`} />
      </div>
      <div className={style.content}>
        <h2>{value}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
};

KeyDataCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

/** Created by carlos on 14/12/2022 */
