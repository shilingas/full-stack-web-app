import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Auth0Provider } from "@auth0/auth0-react"
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain="dev-l464yii0um11d7zp.us.auth0.com"
        clientId="S2vJwD2icLmeYRWgYjtvB8JSbu2BxsrO"
        redirectUri={window.location.origin}
        audience="https://gmvp-api"
    >
        <App />
    </Auth0Provider>
);