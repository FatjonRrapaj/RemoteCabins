import Routes from './Routes';
import FirebaseProvider from '../../firebase';
import { StrictMode } from 'react';

export default function App() {
  return (
    <StrictMode>
      <FirebaseProvider>
        <Routes />
      </FirebaseProvider>
    </StrictMode>
  );
}
