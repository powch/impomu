import React from "react";
import styled from "styled-components";

import { initialState } from "../constants/state";
import { theme } from "../constants/theme";
import ActionButton from "./ActionButton";

const PageContainer = styled.div({
  position: "absolute",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "2rem",
  height: "100vh",
  padding: "0 3rem",
});

const HeaderContainer = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const MessageContainer = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "1rem",
  color: theme.fontColor,
  " > ul": {
    paddingLeft: "1rem",
  },
});

const ErrorPage = ({ appState }) => {
  const { setState } = appState;
  return (
    <PageContainer>
      <HeaderContainer>
        <img src="/pomu_error_title.png" width={"100%"} />
      </HeaderContainer>
      <MessageContainer>
        <p>
          Something has gone wrong and it's probably not your fault! Try some of
          these things and maybe it will work:
        </p>
        <ul>
          <li>
            Currently, this is only for 3D faces. Waifu/Husbando mode may appear
            in a later update.
          </li>
          <li>
            Make sure the URL is correct.
            <ul>
              <li>
                On PC: Right-click an image, choose "Copy image address", and
                paste that into the IMPOMU search bar.
              </li>
              <li>
                On mobile: Try long-pressing an image and opening it in a new
                tab. Then grab the url from the address bar and paste it into
                the IMPOMU search bar.
              </li>
            </ul>
          </li>
          <li>
            If the face is too big, small, or blurry, the facial detection API
            can't see it. Medium is premium, so try to find a nice
            middle-ground.
          </li>
        </ul>
      </MessageContainer>
      <ActionButton handleClick={() => setState(initialState)}>Retry</ActionButton>
    </PageContainer>
  );
};

export default ErrorPage;
