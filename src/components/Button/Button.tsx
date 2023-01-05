import style from "./Button.module.scss";
import PropTypes from "prop-types";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

/**
 * @param {object} props - The props of the component.
 * @param {string} props.text - The text to display on the button
 * @param {(() => void)} props.onClick - The function to call when the button is clicked
 * @example
 * <Button text="Click me" onClick={() => console.log("clicked")} />
 * @return {JSX.Element} - A clickable button
 */
export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={style.Button}>
      {text}
    </button>
  );
};

Button.prototype = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};


/** Created by carlos on 27/12/2022 */
