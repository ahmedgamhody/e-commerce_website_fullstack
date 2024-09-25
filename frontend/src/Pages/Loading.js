import React from "react";
import styled, { keyframes } from "styled-components";

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Adjust opacity here */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Loader = styled.span`
  width: 48px;
  height: 48px;
  border: 6px solid;
  border-color: #06377e transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

function LoadingSubmit() {
  return (
    <Overlay>
      <Loader />
    </Overlay>
  );
}

export default LoadingSubmit;
