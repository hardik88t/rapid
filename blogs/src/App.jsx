import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Dashboard from './pages/Dashboard';
import Error404 from './pages/404';
import RenderBlog from './pages/RenderBlog'

export default function App() {
  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/:slug' element={<RenderBlog />} />

          {/* <Route path='/login' element={<Login />} /> */}
          {/* <Route path='/editblog/:slug' element={<EditBlog />} /> */}
          {/* <Route path='/logout' element={<Test />} /> */}

          <Route path='*' element={<Error404 />} />
        </Routes>
      </Router>

    </div>
  );
}