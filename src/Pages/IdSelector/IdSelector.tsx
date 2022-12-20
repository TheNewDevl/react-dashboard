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

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    if (target.innerText === "Données d'exemple") {
      navigate("/sample");
    } else {
      isValidId(inputValue)
        ? navigate(`/${inputValue}`)
        : (errorRef.current!.style.display = "block");
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
          <button onClick={handleSubmit}>Valider</button>
          <button onClick={handleSubmit}>Données d'exemple</button>
        </div>
        <p ref={errorRef} className={style.error}>
          L'identifiant est incorrect.
        </p>
      </form>
    </Main>
  );
};

/** Created by carlos on 20/12/2022 */
