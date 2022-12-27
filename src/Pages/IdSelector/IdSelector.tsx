import style from "./IdSelector.module.scss";
import Main from "../../Layout/Main/Main";
import { ChangeEvent, useState, MouseEvent, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../utils/context/Context";
import { StoreActionsEnum } from "../../utils/types/types";
import { useStore } from "../../utils/hooks/useStore";

/**
 * Check if the input value is a valid id
 * @param {string} value
 * @return {boolean} true if the value is a valid id
 */
const isValidId = (value: string | undefined) => {
  if (value) {
    const v = value.trim();
    return value === "sample" || v.length > 0 && v.length < 10 && !isNaN(Number(v));
  }
  return false;
};

export const IdSelector = () => {
  const [inputValue, setInputValue] = useState("");
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  //If an id is passed in the url, and the id is valid, set it as the id State that will be used to fetch the user data
  const { id } = useParams();
  const [idState, setIdState] = useState<string>(isValidId(id) ? (id as string) : "");

  //User context
  const { setUser } = useUserContext();

  //Store
  const { error, user } = useStore(idState, StoreActionsEnum.USER);

  useEffect(() => {
    //if store returns an error, set the error message
    error && setErrorDisplay(error);
    //if store returns a user, set the user in the context
    user && setUser({ id: idState, ...user });
  }, [user, error]);

  /**
   * Update the input value of the controlled input
   * @param {React.ChangeEvent} e - The event
   */
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
