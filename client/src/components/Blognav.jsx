import { IoIosMore, IoIosArrowBack } from "react-icons/io";
// import { FaArrowCircleRight } from "react-icons/fa";
// import { FaFire, FaPoo } from 'react-icons/fa';
import Moredock from "./Moredock.jsx";

import { Link } from 'react-router-dom';

const Blognav = ({ title, status, slug }) => {
    return (
        <div className="top-0 left-0 fixed flex flex-row justify-between bg-white shadow-lg ml-16 pr-16 pl-8 min-w-full h-24 align-middle">
            <div className="flex flex-row my-auto">
                <Link to="/manageblogs">
                    <IoIosArrowBack className='w-11 h-11' />
                </Link>
                <NavButton className='border-none font-black text-lg' content={'Home Page'} title={title} />
                <NavButton className='bg-yellow-100 my-2 p-1 border-none w-fit text-xs' content={'Draft'} status={status} />
            </div>
            <div className="flex flex-row my-auto">

                <IoIosMore className='border-gray-500 hover:bg-gray-300 hover:bg-opacity-100 mx-2 px-2 border rounded-lg w-11 h-11 text-lg' />
                {/* <Moredock /> */}
                <NavButton className='hover:bg-gray-300' content={'Cancel'} />
                <NavButton className='bg-blue-700 bg-opacity-80 text-white' content={'Save'} />
                <NavButton className='bg-green-600 bg-opacity-80 text-white' content={'Cancel'} />
            </div>
        </div>
    );
};




const NavButton = ({ content, to, className, title, status }) => {
    const classNames = `border border-gray-500 py-2 px-4 mx-2 rounded-lg hover:bg-opacity-100 ${className}`;

    let buttonContent = content;

    if (title && content === 'New Page') {
        buttonContent = title;
    } else if (status && content === 'Status') {
        buttonContent = status;
    }

    return (
        <Link to={to}>
            <div className={classNames}>
                {buttonContent}
            </div>
        </Link>
    );
};


export default Blognav;
