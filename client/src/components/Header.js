import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div({
  margin: "8rem 0 5rem 0",
});

const Header = () => {
  return (
    <HeaderContainer>
      <img src="/pomu_title.png" width={"100%"} />
    </HeaderContainer>
  );
};

export default Header;
