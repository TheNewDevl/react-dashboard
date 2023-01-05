import "./Tag.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

interface TagProps {
  icon: string;
  alt: string;
  link: string;
}

/**
 * @component Tag component, it is used to display a tag with an icon.
 * @param {object} props - The props of the component
 * @param {string} props.icon - The icon of the tag (must be a valid path to the img src attribute)
 * @param {string} props.alt - The alt of the icon
 * @param {string} props.link - The link to redirect to when the tag is clicked
 * @returns {JSX.Element} - The tag component
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
