import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/index';
import About from './pages/about';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogPage from './pages/[type]';
import BlogPostId from './pages/post/[id]';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/:type" element={<BlogPage />} />
          <Route path="/post/:id" element={<BlogPostId />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
