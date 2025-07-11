import { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

const Configbar = ({ slug: initialSlug, username: initialUsername, showAuthor: initialShowAuthor }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [slug, setSlug] = useState(initialSlug);
    const [username, setUsername] = useState(initialUsername);
    const [showAuthor, setShowAuthor] = useState(initialShowAuthor);

    useEffect(() => {
        setSlug(initialSlug);
        setUsername(initialUsername);
        setShowAuthor(initialShowAuthor);
    }, [initialSlug, initialUsername, initialShowAuthor]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${isOpen ? '' : 'hidden'}`}>
            <div className="top-0 right-0 fixed flex flex-col bg-white shadow-lg mt-24 pb-24 w-72 h-full">
                <div className="flex flex-row justify-between m-6">
                    <div className="">
                        Configurations
                    </div>
                    <RxCross2 size='28' className="" onClick={toggleSidebar} />
                </div>
                <Divider />
                <div className="">
                    <div className="m-6">
                        <label htmlFor="slug" className="block mb-2 font-bold text-gray-700 text-sm"> <span className="text-red-500">*</span> URL</label>
                        <input className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" type="text" name="slug" id="slug" placeholder="/URL" value={slug} onChange={(e) => setSlug(e.target.value)} />
                    </div>
                    <div className="m-6">
                        <label htmlFor="author" className="block mb-2 font-bold text-gray-700 text-sm">Author</label>
                        <input disabled className="shadow px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none" type="text" name="author" id="author" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="flex gap-3 m-6 align-middle">
                        <input type="checkbox" name="showAuthor" id="showAuthor" className="" checked={showAuthor} onChange={(e) => setShowAuthor(e.target.checked)} />
                        <label htmlFor="showAuthor" className="block font-medium text-gray-700 text-sm">Show Author</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Divider = () => <hr />;

export default Configbar;


















// import { RxCross2 } from "react-icons/rx";
// import { FaArrowCircleRight } from "react-icons/fa";
// import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
// import { FaFire, FaPoo } from 'react-icons/fa';

// import { Link } from 'react-router-dom';


// const Configbar = () => {
//     return (
//         <div className="font-red-600">
//             <div className="top-0 right-0 fixed flex flex-col bg-white shadow-lg mt-24 pb-24 w-72 h-full">
//                 <div className="flex flex-row justify-between m-6">
//                     <div className="">
//                         Configurations
//                     </div>
//                     <RxCross2 size='28' className="" />
//                 </div>
//                 <Divider />
//                 <div className="">
//                     <div className="m-6">
//                         <label htmlFor="slug" className="block mb-2 font-bold text-gray-700 text-sm"> <span className="text-red-500">*</span> URL</label>
//                         <input className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" type="text" name="slug" id="slug" placeholder="/URL" />
//                     </div>
//                     <div className="m-6">
//                         <label htmlFor="author" className="block mb-2 font-bold text-gray-700 text-sm">Author</label>
//                         <input disabled className="shadow px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none" type="text" name="author" id="author" placeholder="Your username" />
//                     </div>
//                     <div className="flex gap-3 m-6 align-middle">
//                         <input type="checkbox" name="showAuthor" id="showAuthor" className="" />
//                         <label htmlFor="showAuthor" className="block font-medium text-gray-700 text-sm">Show Author</label>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const NavElement = ({ src, alt, className, to }) => {
//     const classNames = `border border-gray-500 py-2 px-4 mx-2 rounded-lg hover:bg-opacity-100 ${className}`;

//     return (
//         <Link to={to}>
//             <div className={classNames}>
//                 {content}
//             </div>
//         </Link>
//     );
// };


// const Divider = () => <hr />;


// export default Configbar;
