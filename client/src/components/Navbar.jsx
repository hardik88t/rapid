import { LuAlignLeft } from "react-icons/lu";
import { IoIosMore, IoIosArrowBack } from "react-icons/io";
// import { FaArrowCircleRight } from "react-icons/fa";
// import { FaFire, FaPoo } from 'react-icons/fa';
import Moredock from "./Moredock.jsx";

import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <div className="top-0 left-0 fixed flex flex-row justify-between bg-white shadow-lg ml-16 pr-16 pl-8 min-w-full h-24 align-middle">
            <div className="flex flex-row my-auto">
                <LuAlignLeft className='w-11 h-11' />
                <div className="flex flex-col">
                    <NavButton className='pb-0 border-none font-black text-2xl' content={'Pages'} />
                    <NavButton className='pt-0 border-none text-xs' content={'Create and publish pages.'} />
                </div>
            </div>
            <div className="flex flex-row my-auto">
                {/* <NavButton className='bg-blue-700 bg-opacity-80 w-fit text-white' content={'+ Add Page'} /> */}
                <NavButton className='bg-blue-700 bg-opacity-80 w-fit text-white' content={'+ Add Page'} to='/addblog' />
            </div>
        </div>
    );
};




const NavButton = ({ content, to, className }) => {
    const classNames = `border border-gray-500 py-2 px-4 mx-2 rounded-lg hover:bg-opacity-100 ${className}`;

    return (
        <Link to={to}>
            <div className={classNames}>
                {content}
            </div>
        </Link>
    );
};

export default Navbar;
