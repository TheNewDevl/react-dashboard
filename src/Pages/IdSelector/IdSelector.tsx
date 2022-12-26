import style from "./IdSelector.module.scss";
import Main from "../../Layout/Main/Main";
import { ChangeEvent, useState, MouseEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

const isValidId = (value: string) => {
  return value.length > 0 && value.length < 10 && !isNaN(Number(value));
};

export const IdSelector = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  const handleChange = (e: ChangeEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  /**
   * Change the inner text of the error paragraph
   * @param {string} message - The message to display
   */
  const setErrorDisplay = (message: string) => {
    if (errorRef.current) {
      errorRef.current.innerText = message;
    }
  };

  /**
   * Handle the click event on the submit buttons
   * @param {React.MouseEvent} e - The event
   */
  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    setErrorDisplay("");
    switch (target.value) {
      case "Données d'exemple":
        setIdState("sample");
        break;
      default:
        isValidId(inputValue)
          ? setIdState(inputValue)
          : setErrorDisplay("L'id doit être un nombre de 1 à 9 chiffres");
    }
  };

  return (
    <Main>
      <form className={style.IdSelector} action="">
        <label htmlFor="id-selector">
          <span className={style.red}>Oups</span>, vous n'avez pas renseigné d'identifiant. <br />
          <span className={style.small}>Veuillez le renseigner ci dessous.</span>
          <input
            value={inputValue}
            onChange={handleChange}
            type="text"
            name="id-selector"
            id="id-selector"
          />
        </label>
        <div className={style.buttonsContainer}>
          <input type="submit" onClick={handleSubmit} value="Valider" />
          <input type="submit" onClick={handleSubmit} value="Données d'exemple" />
        </div>
        <p ref={errorRef} className={style.error}></p>
      </form>
    </Main>
  );
};

/** Created by carlos on 20/12/2022 */
