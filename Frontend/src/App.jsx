import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Anbf from './components/Anbf';
import SpecialMessage from './components/FullscreenGallery';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Anbf />} />
        <Route path="/special-message" element={<SpecialMessage />} />
      </Routes>
    </Router>
  );
}

export default App;