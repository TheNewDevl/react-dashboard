import "./Tag.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

interface TagProps {
  icon: string;
  alt: string;
  link: string;
}

/**
 * @param {string} icon - The icon of the tag
 * @param {string} alt - The alt of the icon
 * @param {string} link - The link of the icon
 * @returns {JSX.Element} - The tag component
 * @constructor
 * @example
 * <Tag icon="./meditation.svg" alt="Meditation" />
 */
const Tag = ({ icon, alt, link }: TagProps) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(link)} className="Tag">
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
