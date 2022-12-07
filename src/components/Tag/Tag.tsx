import "./Tag.scss";
import PropTypes from "prop-types";

interface TagProps {
  icon: string;
  alt: string;
}

/**
 * @param {string} icon - The icon of the tag
 * @param {string} alt - The alt of the icon
 * @returns {JSX.Element} - The tag component
 * @constructor
 * @example
 * <Tag icon="./meditation.svg" alt="Meditation" />
 */
const Tag = ({ icon, alt }: TagProps) => {
  return (
    <button className="Tag">
      <img src={icon} alt={alt} />
    </button>
  );
};

Tag.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Tag;
/** Created by carlos on 07/12/2022 */
