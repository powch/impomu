import React from "react";
import styled from "styled-components";

import {theme} from "../constants/theme";

const StyledButton = styled.button({
  fontSize: "2rem",
  height: "6rem",
  width: "15rem",
  color: "#fff",
  borderRadius: "0.5rem",
  backgroundColor: theme.green,
  border: `2px solid ${theme.greenDarker}`,
  boxShadow: "8px 8px 8px 2px rgba(0, 0, 0, 0.33)",
  transition: "background-color 0.25s",
  ":hover": {
    backgroundColor: theme.greenDarker,
  },
});

const ActionButton = ({ children, handleClick }) => {
  return (
    <StyledButton onClick={handleClick} className="action-button">
      {children}
    </StyledButton>
  );
};

export default ActionButton;
