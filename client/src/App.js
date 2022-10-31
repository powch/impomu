import React, { useRef, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import * as faceapi from "face-api.js";

import { initialState } from "./constants/state";
import ActionButton from "./components/ActionButton";
import UrlInput from "./components/UrlInput";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";
import ErrorPage from "./components/ErrorPage";

import GetImage from "./rest/GetImage";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Fredoka One', cursive;
  }

  body {
    padding: 0;
    margin: 0;
  }

  .bounce-7 {
    animation-name: bounce-7;
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
  }

  @keyframes bounce-7 {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(1.1, 0.9) translateY(0);
    }
    30% {
      transform: scale(0.9, 1.1) translateY(-100px);
    }
    50% {
      transform: scale(1.05, 0.95) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(-7px);
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }
`;

const AppContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 3rem",
});

const StyledImage = styled.img({});

const Canvas = styled.canvas({
  position: "absolute",
});

const FormContainer = styled.div({
  marginTop: "5rem",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ImageContainer = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ButtonContainer = styled.div({
  marginTop: "4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

const App = () => {
  const imgRef = useRef();
  const canvasRef = useRef();

  const [state, setState] = useState(initialState);

  const hasImage = state.imageData.length;

  const detectFaces = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );
    if (state.imageData && detections.length) {
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        imgRef.current
      );

      faceapi.matchDimensions(canvasRef.current, imgRef.current);
      const ctx = canvasRef.current.getContext("2d");
      const image = new Image();
      image.src = "/pomu_layer.png";
      image.onload = () => {
        detections.forEach((detection) => {
          const dWidth = detection.box.width;
          const dHeight = detection.box.height;
          const adjustedWidth = dWidth * 1.85;
          const adjustedHeight = dHeight * 2.75;
          const dX = detection.box.x - adjustedWidth * 0.25;
          const dY = detection.box.y - adjustedHeight / 2;

          ctx.drawImage(image, dX, dY, adjustedWidth, adjustedHeight);
        });
      };
    } else {
      setState({
        ...state,
        error: {
          hasError: true,
        },
      });
    }
  };

  useEffect(() => {
    const loadModelsAndDetectFaces = () => {
      return Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("/models")])
        .then((data) => {
          detectFaces();
        })
        .catch((e) =>
          setState({
            ...state,
            error: { hasError: true, errorKey: `${e}` },
          })
        );
    };

    imgRef.current && state.isDetecting && loadModelsAndDetectFaces();

    const observer = new MutationObserver((mutationList, observer) => {
      mutationList.length &&
        setState({ ...state, loading: false, isDetecting: false });
    });
    observer.observe(canvasRef.current, { attributes: true });
  }, [state.isDetecting]);

  const handleImageClick = () => {
    setState({ ...state, loading: true });
  };

  const handleBackClick = () => {
    canvasRef.current.setAttribute("width", 0);
    canvasRef.current.setAttribute("height", 0);
    setState(initialState);
  };

  return (
    <>
      <GlobalStyle />
      {state.error.hasError ? (
        <ErrorPage appState={{ state, setState }} />
      ) : null}
      {state.loading || state.isDetecting ? <LoadingScreen /> : null}
      <AppContainer>
        <Header />
        <ImageContainer>
          <StyledImage ref={imgRef} src={state.imageData} />
          <Canvas ref={canvasRef} />
        </ImageContainer>
        {!state.imageData ? (
          <FormContainer>
            <UrlInput appState={{ state, setState }} />
          </FormContainer>
        ) : null}
        <ButtonContainer>
          <ActionButton
            disabled={!state.inputUrl.length}
            hasImage={hasImage}
            handleClick={!hasImage ? handleImageClick : handleBackClick}
          >
            {!hasImage ? "I'm Pomu!" : "Back"}
          </ActionButton>
        </ButtonContainer>
      </AppContainer>
      {state.loading ? <GetImage appState={{ state, setState }} /> : null}
    </>
  );
};

export default App;
