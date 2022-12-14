import React from "react";
import styled from "styled-components";

import { theme } from "../constants/theme";
import { DESKTOP } from "../constants/mediaQueries";

const StyledInput = styled.input({
  width: "100%",
  height: "4rem",
  borderRadius: "0.75rem",
  border: `2px solid ${theme.greenDarker}`,
  boxShadow: "8px 8px 8px 2px rgba(0, 0, 0, 0.33)",
  fontSize: "1.25rem",
  paddingLeft: "2rem",
  color: theme.fontColor,
  [DESKTOP]: {
    width: "65%",
  },
});

const UrlInput = ({ appState }) => {
  const { state, setState } = appState;
  return (
    <StyledInput
      placeholder="Enter an image URL"
      value={state.inputUrl}
      onChange={(e) => setState({ ...state, inputUrl: e.target.value })}
    />
  );
};

export default UrlInput;
