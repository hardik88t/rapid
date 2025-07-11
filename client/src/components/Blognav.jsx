import { IoIosMore, IoIosArrowBack } from "react-icons/io";
// import { FaArrowCircleRight } from "react-icons/fa";
// import { FaFire, FaPoo } from 'react-icons/fa';
import Moreoption from "./Moreoption.jsx";
import StatusComponent from './StatusComponent.jsx'

import { Link } from 'react-router-dom';

const Blognav = ({ title, status, slug, onCancel, onSave, onPublish, onClear }) => {
    let buttons = [
        { content: "Preview", className: "text-green-600", to: `/previewblog`, type: 'button' },
        { content: "Edit", className: "text-blue-600", to: `/editblog/${slug}`, type: 'button' },
        // { content: "NewBlog", className: "text-blue-600", to: `/addblog`, type: 'button' }
    ];
    if (slug === undefined) {
        buttons = [
            { content: "Preview", className: "text-green-600", to: `/previewblog`, type: 'button' },
            // { content: "Edit", className: "text-blue-600", to: `/editblog/${slug}`, type: 'button' },
            // { content: "NewBlog", className: "text-blue-600", to: `/addblog`, type: 'button' }
        ];
    }

    return (
        <div className="top-0 left-0 z-10 fixed flex flex-row justify-between bg-white shadow-lg ml-16 pr-16 pl-8 min-w-full h-24">
            <div className="flex flex-row my-auto">
                <Link to="/manageblogs">
                    <IoIosArrowBack className='w-11 h-11 hover:cursor-pointer' />
                </Link>
                <NavButton className='border-none font-black text-lg' content={title ?? 'Home Page'} />
                <StatusComponent status={status} />
            </div>
            <div className="flex flex-row my-auto">
                <Moreoption buttons={buttons} />
                <NavButton onClick={onCancel} className='hover:bg-gray-300' content={'Cancel'} />
                <NavButton onClick={onClear} className='bg-yellow-300 bg-opacity-60' content={'Clear'} />
                <NavButton onClick={onSave} className='bg-blue-700 bg-opacity-80 text-white' content={'Save'} />
                <NavButton onClick={onPublish} className='bg-green-600 bg-opacity-80 text-white' content={'Publish'} />
            </div>
        </div>
    );
};

const NavButton = ({ content, to, className, onClick }) => {
    const classNames = `border border-gray-500 py-2 px-4 mx-2 rounded-lg hover:bg-opacity-100 ${className}`;

    return (
        <div className={classNames} onClick={onClick}>
            {content}
        </div>
    );
};



export default Blognav;
