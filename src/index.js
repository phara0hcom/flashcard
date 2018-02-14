import { render } from 'react-dom';
import React from 'react';
import App from './js/App';

render(
  <App />,
  document.getElementById('root')
);

// if (module && module.hot) {
//   module.hot.accept('./js/App', () => {
//     const NewApp = require('./js/App').default;
//     render(
//       <AppContainer>
//         <NewApp />
//       </AppContainer>,
//       document.getElementById('root')
//     );
//   });
// }