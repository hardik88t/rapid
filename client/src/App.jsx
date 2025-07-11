import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ManageBlogs from './pages/ManageBlogs';
import EditBlog from './pages/EditBlog';
// import AddBlog from './pages/EditBlog';
import Test from './pages/Test';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Test />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/notification' element={<Test />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/manageblogs' element={<ManageBlogs />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/logout' element={<Test />} /> */}
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/editblog' element={<EditBlog />} />
        <Route path='/addblog' element={<EditBlog />} />
        {/* Handle all /editblog/:slug routes */}
        <Route path='/editblog/:slug' element={<EditBlog />} />
        <Route path='*' element={<Test />} />
      </Routes>
    </Router>
  );
}