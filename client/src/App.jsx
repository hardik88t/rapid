import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ManageBlogs from './pages/ManageBlogs';
import EditBlog from './pages/EditBlog';
import AddBlog from './pages/AddBlog';
import Test from './pages/Test';
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
          <Route path='/' element={<ManageBlogs myBlogsOnly={true} />} />
          <Route path='/blogs' element={<Dashboard />} />
          <Route path='/blogs/:slug' element={<RenderBlog />} />

          <Route path='/profile' element={<Profile />} />
          <Route path='/notification' element={<Test />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/manageblogs' element={<ManageBlogs />} />

          {/* <Route path='/addblog' element={<AddBlog isAddBlog={true} />} /> */}
          <Route path='/addblog' element={<EditBlog isAddBlog={true} />} />
          <Route path='/editblog/:slug' element={<EditBlog isAddBlog={false} />} />
          <Route path='/previewblog' element={<RenderBlog isPreview={true} />} />
          <Route path='/previewblog/:slug' element={<RenderBlog />} />

          <Route path='/about' element={<About />} />

          <Route path='/register' element={<Register />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/login' element={<Login />} />

          <Route path='*' element={<Error404 />} />



        </Routes>
      </Router>
    </div>
  );
}