// import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import NoBlog from '../components/NoBlog.jsx';
import SideBar from '../components/Sidebar.jsx';

export default function Dashboard() {
    // const [open, setOpen] = useState(true);
    return (

        <div>
            <SideBar></SideBar>
            <Navbar />
            <div className='flex flex-col mt-24 ml-16' >
                <div className="flex justify-center pt-28">
                    <NoBlog />
                </div>
            </div>
        </div>
    );
}

