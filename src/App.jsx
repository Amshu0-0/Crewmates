import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import GalleryPage from './pages/GalleryPage';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/crewmate/:id" element={<DetailPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;