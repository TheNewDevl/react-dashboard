import "./VerticalLayout.scss";
import Tag from "../Tag/Tag";

/**
 * @type {{alt: string, icon: string}[]}
 */
const Tags: { alt: string; icon: string }[] = [
  {
    alt: "Meditation",
    icon: "./meditation.svg",
  },
  {
    alt: "Swimming",
    icon: "./swimming.svg",
  },
  {
    alt: "Cycle",
    icon: "./cycle.svg",
  },
  {
    alt: "Musculation",
    icon: "./musculation.svg",
  },
];

/**
 * @return {JSX.Element}
 * @constructor
 */
const VerticalLayout = () => {
  return (
    <div className="VerticalLayout">
      <div className="VerticalLayout__tags__container">
        {Tags.map(({ alt, icon }) => (
          <Tag alt={alt} icon={icon} />
        ))}
      </div>
      <p className="VerticalLayout__copy">Copiryght, SportSee 2020</p>
    </div>
  );
};

export default VerticalLayout;
/** Created by carlos on 07/12/2022 */
