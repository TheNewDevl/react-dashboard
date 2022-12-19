import "./Main.scss";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

interface MainProps extends PropsWithChildren {}

/**
 * @param {PropsWithChildren} children - The children of the component
 * @returns {JSX.Element} - The main component
 * @constructor
 * @example
 * <Main>
 *  <GraphsContainer>
 *    <Graph />
 *  </GraphsContainer>
 * </Main>
 */
const Main = ({ children }: MainProps) => {
  const mainRef = useRef<HTMLElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    /** set main margin-top = header height */
    const handleMarginTop = () => {
      const header = document.querySelector("header");
      const height = header?.clientHeight;
      mainRef.current?.style.setProperty("margin-top", `${height}px`);
    };
    handleMarginTop();
    const handleResize = () => !isResizing && setIsResizing(true);
    if (isResizing) {
      setTimeout(() => {
        setIsResizing(false);
        handleMarginTop();
      }, 10);
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
