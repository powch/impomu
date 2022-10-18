import React from "react";
import styled from "styled-components";

import PomuTitle from "./PomuTitle";

const HeaderContainer = styled.div({
  margin: "8rem 0 5rem 0",
});

const Header = () => {
  return (
    <HeaderContainer>
      <PomuTitle />
    </HeaderContainer>
  );
};

export default Header;
