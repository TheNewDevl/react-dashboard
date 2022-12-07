import "./GraphsContainer.scss";
import { PropsWithChildren } from "react";
import PropTypes from "prop-types";

interface GraphsContainerProps extends PropsWithChildren {}

/**
 * @param {PropsWithChildren} children - The children of the component
 * @returns {JSX.Element} - The graphs container component
 * @constructor
 * @example
 * <GraphsContainer>
 *   <Graph />
 *   <Graph />
 * </GraphsContainer>
 */
const GraphsContainer = ({ children }: GraphsContainerProps) => {
  return <div className="GraphsContainer">{children}</div>;
};

GraphsContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GraphsContainer;
/** Created by carlos on 07/12/2022 */
