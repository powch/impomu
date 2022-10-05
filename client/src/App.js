import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";

const AppContainer = styled.div({
  display: "flex",
});

const Image = styled.img(({ height, width }) => ({
  height: "1000px",
  width: "1000px",
}));

const Canvas = styled.canvas(({ height, width }) => ({
  position: "absolute",
  height: "1000px",
  width: "1000px",
}));

const App = () => {
  const imgRef = useRef();
  const canvasRef = useRef();

  const [state, setState] = useState({
    loading: true,
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

    setState({ ...state, loading: false, detectedFaces: detections });
  };

  useEffect(() => {
    const loadModels = () =>
      Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("/models")])
        .then((data) => detectFaces())
        .catch((e) =>
          setState({ ...state, error: { hasError: true, errorKey: `${e}` } })
        );

    imgRef.current && loadModels();
  }, []);

  return (
    <AppContainer>
      <button
        onClick={() => {
          const foo = fetch("/api/image", { method: "get" });
        }}
      >
        test
      </button>
      {/* <Canvas ref={canvasRef} /> */}
    </AppContainer>
  );
};

export default App;
