import { useEffect } from "react";

const GetImage = ({ appState, children }) => {
  const { state, setState } = appState;

  useEffect(() => {
    fetch("/api/image", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: state.inputUrl,
      }),
    })
      .then((res) => res.json())
      .then((res) =>
        setState({
          ...state,
          imageData: res.data.imageData,
          loading: false,
          isDetecting: true,
        })
      )
      .catch((e) =>
        setState({
          ...state,
          error: { hasError: true, errorKey: `${e}` },
        })
      );
  });

  return children || null;
};

export default GetImage;
