import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Research from './pages/Research'
import Contact from './pages/Contact'
import Teams from './pages/Teams'
import EdVantage from './pages/EdVantage'
import Updates from './pages/Updates'
import './App.css'
import { DataProvider } from './context/DataContext'

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-highlight');
    document.body.appendChild(cursor);

    let rafId = null;
    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      // Smooth interpolation
      const moveX = (clientX - lastX) * 0.2;
      const moveY = (clientY - lastY) * 0.2;
      
      lastX += moveX;
      lastY += moveY;

      cursor.style.transform = `translate(${lastX}px, ${lastY}px)`;
      rafId = requestAnimationFrame(() => moveCursor(e));
    };

    const handleMouseMove = (e) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      moveCursor(e);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <DataProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
          <div 
            className="cursor-glow"
            style={{
              left: mousePos.x,
              top: mousePos.y,
            }}
          />
          <div className="relative z-10"> {/* Content wrapper */}
            <Navbar />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/research" element={<Research />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/edvantage" element={<EdVantage />} />
                <Route path="/updates" element={<Updates />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
