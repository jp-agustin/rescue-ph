import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PropTypes from "prop-types";

import colors from "../../../../assets/res/colors";

import { LoaderContainer } from "./LazyLoader-styles";

const LazyLoader = ({ height }) => (
  <LoaderContainer height={height || "100vh"}>
    <Loader
      visible
      color={colors.PRIMARY}
      type="TailSpin"
      height="10rem"
      width="10rem"
    />
  </LoaderContainer>
);

LazyLoader.propTypes = {
  height: PropTypes.number
};

export default LazyLoader;
