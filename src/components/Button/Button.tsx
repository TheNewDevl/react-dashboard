import style from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={style.Button}>
      {text}
    </button>
  );
};

/** Created by carlos on 27/12/2022 */
