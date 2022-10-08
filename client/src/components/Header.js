import React from "react";
import styled from "styled-components";

const StyledHeader = styled.h1({
  fontSize: "8rem",
  color: "#333",
});

const Header = () => {
  return <StyledHeader>I'm Pomu!</StyledHeader>;
};

export default Header;
