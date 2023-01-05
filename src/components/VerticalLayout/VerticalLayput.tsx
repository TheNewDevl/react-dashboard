import "./VerticalLayout.scss";
import Tag from "../Tag/Tag";
import { useUserContext } from "../../utils/context/Context";

/**
 * @type {{alt: string, icon: string}[]}
 */
const Tags: { alt: string; icon: string; link: string }[] = [
  {
    alt: "Meditation",
    icon: "/meditation.svg",
    link: "performance",
  },
  {
    alt: "Swimming",
    icon: "/swimming.svg",
    link: "activity",
  },
  {
    alt: "Cycle",
    icon: "/cycle.svg",
    link: "average",
  },
  {
    alt: "Musculation",
    icon: "/musculation.svg",
    link: "score",
  },
];

/**
 * @component VerticalLayout component
 * Contains the tags and copy right
 * @returns {JSX.Element}
 * @example
 * <VerticalLayout />
 */
const VerticalLayout = () => {
  const { user } = useUserContext();
  return (
    <div className="VerticalLayout">
      <div className="VerticalLayout__tags__container">
        {Tags.map(({ alt, icon, link }, index) => (
          <Tag link={`/user/${user?.id}/${link}`} key={index} alt={alt} icon={icon} />
        ))}
      </div>
      <p className="VerticalLayout__copy">Copyright, SportSee 2020</p>
    </div>
  );
};

export default VerticalLayout;
/** Created by carlos on 07/12/2022 */
