import React from 'react';
// import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from './store';

// ReactDOM.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </React.StrictMode>,
//     document.getElementById('root'),
// );
// reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// How to Upgrade to React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis

(function () {
    const container = document.getElementById('root');

    if (!container) {
        console.log('Element with id "#root" is undefined !');
        return;
    }

    const root = createRoot(container);

    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <StoreProvider>
                    <App />
                </StoreProvider>
            </BrowserRouter>
        </React.StrictMode>,
    );

    reportWebVitals();
})();
