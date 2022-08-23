import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import './App.module.scss';
import { Modal } from './components/design/Modal';
import Unsplash from './components/unsplash/Unsplash';
import Hero from './components/Hero';
import MobileApp from './components/MobileApp';
import { useWindowSize } from './services/useWindowSize';

function App() {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;
  return isMobile ? (
    <MobileApp />
  ) : (
    <div className="App">
      <Hero />
      <Modal title="Unsplash" icon={<FontAwesomeIcon icon={faCameraRetro} />}>
        <Unsplash></Unsplash>
      </Modal>
    </div>
  );
}

export default App;
