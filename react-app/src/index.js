import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { en, cs } from 'make-plural/plurals'
import { messages as enMessages } from './locales/en/messages'
import { messages as zhMessages } from './locales/zh/messages'


i18n.loadLocaleData({
  en: { plurals: en },
  cs: { plurals: cs },
})


i18n.load({
  en: enMessages,
  zh: zhMessages,
})
i18n.activate('zh')



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nProvider i18n={i18n}>
      <App />
    </I18nProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
