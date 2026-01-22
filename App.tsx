
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TrafficGate } from './components/TrafficGate';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Admin } from './pages/Admin';
import { FAQ } from './pages/FAQ';
import { HowToApply } from './pages/HowToApply';
import { Resources } from './pages/Resources';

const App: React.FC = () => {
  return (
    <Router>
      <TrafficGate>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/how-to-apply" element={<HowToApply />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </Layout>
      </TrafficGate>
    </Router>
  );
};

export default App;
