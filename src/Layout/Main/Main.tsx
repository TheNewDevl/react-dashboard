import "./Main.scss";
import { PropsWithChildren } from "react";
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
  return <main className="Main">{children}</main>;
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Main;
/** Created by carlos on 07/12/2022 */
