import "./Tag.scss";

interface TagProps {
  icon: string;
  alt: string;
}

const Tag = ({ icon, alt }: TagProps) => {
  return (
    <button className="Tag">
      <img src={icon} alt={alt} />
    </button>
  );
};

export default Tag;
/** Created by carlos on 07/12/2022 */
