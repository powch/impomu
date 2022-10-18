import React from "react";
import styled from "styled-components";

import LoadingTitle from "./LoadingTitle";

const LoadingContainer = styled.div({
  position: "absolute",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
});

const LoadingScreen = () => (
  <LoadingContainer>
    <div
      style={{
        animationDuration: "1.25s",
        animationIterationCount: "infinite",
      }}
      className="bounce-7"
    >
      <LoadingTitle />
    </div>
  </LoadingContainer>
);

export default LoadingScreen;
