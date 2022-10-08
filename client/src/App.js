import React, { useRef, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import * as faceapi from "face-api.js";

import ActionButton from "./components/ActionButton";
import UrlInput from "./components/UrlInput";
import Header from "./components/Header";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Fredoka One', cursive;
  }
`;

const AppContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Image = styled.img(({ height, width }) => ({}));

const Canvas = styled.canvas(({ height, width }) => ({
  position: "absolute",
}));

const FormContainer = styled.div({
  marginTop: "8rem",
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

const App = () => {
  const imgRef = useRef();
  const canvasRef = useRef();

  const [state, setState] = useState({
    loading: true,
    imageData: "",
    inputUrl: "",
    error: {
      hasError: false,
      errorKey: null,
    },
  });

  const detectFaces = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );
    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);

    faceapi.matchDimensions(canvasRef.current, imgRef.current);
    faceapi.draw.drawDetections(canvasRef.current, detections);

    detections?.length && setState({ ...state, loading: false });
  };

  useEffect(() => {
    const loadModelsAndDetectFaces = () =>
      Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("/models")])
        .then((data) => {
          detectFaces();
        })
        .catch((e) =>
          setState({ ...state, error: { hasError: true, errorKey: `${e}` } })
        );

    imgRef.current && state.imageData && loadModelsAndDetectFaces();
  }, [state.imageData]);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <ImageContainer>
          <Image ref={imgRef} src={state.imageData} />
          <Canvas ref={canvasRef} />
        </ImageContainer>
        {!state.imageData ? (
          <FormContainer>
            <UrlInput appState={{ state, setState }} />
            <ActionButton
              handleClick={() => {
                const foo = fetch("/api/image", {
                  method: "put",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    url: "https://image.shutterstock.com/image-photo/image-business-partners-discussing-documents-600w-125338145.jpg",
                  }),
                })
                  .then((res) => res.json())
                  .then((res) =>
                    setState({ ...state, imageData: res.data.imageData })
                  )
                  .catch((e) =>
                    setState({
                      ...state,
                      error: { hasError: true, errorKey: `${e}` },
                    })
                  );
              }}
            >
              I'm Pomu!
            </ActionButton>
          </FormContainer>
        ) : null}
      </AppContainer>
    </>
  );
};

export default App;
