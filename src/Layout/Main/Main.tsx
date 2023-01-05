import "./Main.scss";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * @component Main component, it is used to display the main content of the app.
 * All the content must be wrapped inside this component because its size is calculated based on
 * header and vertical layout size( because sizes change depending on the screen size)
 * @param {object} props - The props of the component
 * @param {JSX.Element} props.children - The content to display inside the main component
 * @returns {JSX.Element} - The main component
 * @example
 * <Main>
 *  <section>
 *    <Graph />
 *  </section>
 * </Main>
 */
const Main = ({ children }: PropsWithChildren) => {
  const mainRef = useRef<HTMLElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    /** calculate margin top and width depending on header and vertical layout size */
    const handleMarginAndWidth = () => {
      const header = document.querySelector("header");
      const verticalLayout = document.querySelector(".VerticalLayout");

      const height = header?.clientHeight;
      mainRef.current?.style.setProperty("margin-top", `${height}px`);
      mainRef.current?.style.setProperty(
        "margin-left",
        `${verticalLayout?.getBoundingClientRect().y === 0 ? verticalLayout?.clientWidth : 0}px`
      );
      mainRef.current?.style.setProperty(
        "width",
        `calc(100vw - ${
          verticalLayout?.getBoundingClientRect().x === 0 ? verticalLayout?.clientWidth : 0
        }) `
      );
    };
    handleMarginAndWidth();
    /**
     * Prevents the handleMarginAndWidth function from being called multiple times
     * @return {false | void}
     */
    const handleResize = () => !isResizing && setIsResizing(true);
    if (isResizing) {
      setTimeout(() => {
        setIsResizing(false);
        handleMarginAndWidth();
      }, 50);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isResizing]);

  return (
    <main ref={mainRef} className="Main">
      {children}
    </main>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Main;
/** Created by carlos on 07/12/2022 */
