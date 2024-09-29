// /src/styles.js
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: black;
  color: white;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;

  h1 {
    font-size: 2em;
    color: white;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background-color: orange;
    color: white;
    cursor: pointer;
    font-size: 1em;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(255, 165, 0, 0.7);
    transition: 0.3s ease;

    &:hover {
      box-shadow: 0px 0px 20px rgba(255, 165, 0, 1);
    }
  }
`;
