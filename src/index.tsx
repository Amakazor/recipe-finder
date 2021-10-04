import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './styles/global';
import '@fontsource/open-sans';

ReactDOM.render(
    <StrictMode>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <GlobalStyle />
        <App />
    </StrictMode>,
    document.getElementById('root'),
);
