import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/reset.css';
import './assets/css/common.css';
import App from './App.tsx'

import {Provider} from 'react-redux';
import {store} from './store/store.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
        <App />
        </Provider>
    </StrictMode>,
)