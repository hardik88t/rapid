import { RxCross2 } from "react-icons/rx";
import { LuAlignLeft } from "react-icons/lu";
import { IoIosMore, IoIosArrowBack } from "react-icons/io";
// import { FaArrowCircleRight } from "react-icons/fa";
// import { FaFire, FaPoo } from 'react-icons/fa';
import Moredock from "./Moredock.jsx";

import { Link } from 'react-router-dom';


const DatePicker = () => {
    return (
        <div className="flex flex-col justify-center gap-1 border-gray-300 border rounded-lg w-96">
            <div className="flex flex-row justify-between bg-gray-900 p-6 rounded-t-lg">
                <div className="font-bold text-white text-xl">
                    Publish
                </div>
                <div className="text-gray-500 text-sm">
                    <RxCross2 size='28' fill="" className="" />
                </div>
            </div>
            <div className="m-6">
                <label htmlFor="publishdate" className="flex flex-row justify-start mb-2 text-gray-700 text-left"> <span className="text-red-500">*</span>Publish Date</label>
                <input className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" type="date" name="publishdate" id="publishdate" />
            </div>
            <div className="m-6">
                <label htmlFor="publishtime" className="flex flex-row justify-start mb-2 text-gray-700 text-left"> <span className="text-red-500">*</span>Publish Time</label>
                <input className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" type="time" name="publishtime" id="publishtime" value='10:00' />
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

export default DatePicker;
