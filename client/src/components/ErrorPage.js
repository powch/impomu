import React from "react";
import styled from "styled-components";

import { DESKTOP } from "../constants/mediaQueries";
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
  width: "100%",
  height: "100vh",
  padding: "0 1rem",
  [DESKTOP]: {
    width: "100%",
  },
});

const InnerPageContainer = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [DESKTOP]: {
    width: "48rem",
  },
});

const HeaderContainer = styled.div({
  width: "75%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [DESKTOP]: {
    width: "65%",
  },
});

const MessageContainer = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "2rem 0",
  fontSize: "0.8rem",
  color: theme.fontColor,
  " > ul": {
    paddingLeft: 0,
  },
  [DESKTOP]: {
    fontSize: "1rem",
  },
});

const ErrorPage = ({ appState }) => {
  const { setState } = appState;
  return (
    <PageContainer>
      <InnerPageContainer>
        <HeaderContainer>
          <img src="/pomu_error_title.png" width={"100%"} />
        </HeaderContainer>
        <MessageContainer>
          <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Something has gone wrong and it's probably not your fault! Try some
            of these things and maybe it will work:
          </p>
          <ul style={{ width: "75%" }}>
            <li>
              Currently, this is only for 3D faces. Waifu/Husbando mode may
              appear in a later update.
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
                  tab. Then copy the url from the address bar and paste it into
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
        <ActionButton handleClick={() => setState(initialState)}>
          Retry
        </ActionButton>
      </InnerPageContainer>
    </PageContainer>
  );
};

export default ErrorPage;
