import NoBlog from '../components/NoBlog.jsx';
import SideBar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx'
import Configbar
    from '../components/Configbar.jsx';
export default function Test() {
    return (
        <>
            <SideBar />
            <Navbar />
            {/* <Configbar /> */}

            <div className='flex justify-center items-center mt-24 mr-72 ml-16 h-96 text-xl align-middle'>
                TEST/HOME PAGE
            </div>

        </>
    );
}



