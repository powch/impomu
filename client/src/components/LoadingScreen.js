import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div({
  position: "absolute",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
  padding: "0 3rem",
});

const LoadingScreen = () => (
  <LoadingContainer>
    <div
      style={{
        width: "50%",
        animationDuration: "1.25s",
        animationIterationCount: "infinite",
      }}
      className="bounce-7"
    >
      <img src="/loading_title.png" width={"100%"} />
    </div>
  </LoadingContainer>
);

export default LoadingScreen;
