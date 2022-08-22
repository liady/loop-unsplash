import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import './App.module.scss';
import { Modal } from './components/design/Modal';
import Unsplash from './components/unsplash/Unsplash';
import Hero from './components/Hero';

function App() {
  return (
    <div className="App">
      <Hero />
      <Modal title="Unsplash" icon={<FontAwesomeIcon icon={faCameraRetro} />}>
        <Unsplash></Unsplash>
      </Modal>
    </div>
  );
}

export default App;
