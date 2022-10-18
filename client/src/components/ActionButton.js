import React from "react";
import styled from "styled-components";

import { theme } from "../constants/theme";

const StyledButton = styled.button(({ hasImage }) => ({
  fontSize: "2rem",
  height: "6rem",
  width: "15rem",
  color: "#fff",
  borderRadius: "0.75rem",
  backgroundColor: theme.green,
  border: `2px solid ${theme.greenDarker}`,
  boxShadow: "8px 8px 8px 2px rgba(0, 0, 0, 0.33)",
  transition: "background-color 0.25s",
  ":hover": {
    backgroundColor: theme.greenDarker,
  },
}));

const ActionButton = ({ children, handleClick, hasImage }) => {
  return (
    <StyledButton hasImage={hasImage} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

export default ActionButton;
