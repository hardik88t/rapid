import { LuAlignLeft } from "react-icons/lu";
import { IoIosMore, IoIosArrowBack } from "react-icons/io";
// import { FaArrowCircleRight } from "react-icons/fa";
// import { FaFire, FaPoo } from 'react-icons/fa';

import { Link } from 'react-router-dom';


const NoBlog = ({ contentHead }) => {
    return (
        <div className="flex flex-row gap-6 border-gray-300 border rounded-lg w-fit">
            <div className="flex flex-col justify-center ml-6">
                <div className="flex flex-col">
                    <div className="m-2 font-bold text-3xl">
                        {
                            contentHead ?? "No Pages Found."
                        }

                    </div>
                    <div className="m-2 text-gray-500 text-sm">
                        Looks like you don’t have any pages yet. Let’s add a new page.
                    </div>
                    <NavButton className='bg-blue-700 bg-opacity-80 w-fit text-white' content={'+ Add Page'} />
                </div>
            </div>
            <div className="mr-6">
                <img src="/img/noblog.png" alt="No Blog At The Moment" />
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

export default NoBlog;
