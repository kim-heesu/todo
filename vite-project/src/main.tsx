import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/reset.css';
import './assets/css/common.css';
import App from './App.tsx'


import { ThemeProvider } from 'styled-components';
import { theme } from './assets/js/theme.ts';

import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store,persistor} from './store/store';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </StrictMode>,
)