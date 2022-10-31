import React from "react";
import styled from "styled-components";

import { theme } from "../constants/theme";

const StyledButton = styled.button(({ disabled }) => ({
  fontSize: "2rem",
  height: "6rem",
  width: "15rem",
  color: "#fff",
  borderRadius: "0.75rem",
  backgroundColor: !disabled ? theme.green : theme.disabled,
  border: `2px solid ${theme.greenDarker}`,
  boxShadow: "8px 8px 8px 2px rgba(0, 0, 0, 0.33)",
  transition: "background-color 0.25s",
  ":hover": {
    backgroundColor: !disabled ? theme.greenDarker : theme.disabledDarker,
  },
}));

const ActionButton = ({ children, handleClick, disabled }) => {
  return (
    <StyledButton onClick={!disabled ? handleClick : null} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default ActionButton;
