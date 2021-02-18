import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; /* 1rem = 10px */
    height: 100%;

    @media (min-width: 1981px) {
      font-size: 80%;
    };
  }

  body {
    height: 100%;
    background: #F0F2F5;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
  }

  body, #root {
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  #root {
    height: 100%;
  }

  body, input, button {
    font: 1.6rem "Poppins", sans-serif;
    line-height: 1.48;
  }

  .error-message {
    font-size: 1.2rem;
    color: #f33c39;
  }

  button {
    cursor: pointer;
    border: 0;
  }

  ul {
    list-style: none;
    text-align: left;
    padding: 0;
  }
`;
