// import { FaArrowCircleRight } from "react-icons/fa";
// import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
// import { FaFire, FaPoo } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const SideBar = () => {
    return (
        <div className="top-0 left-0 fixed flex flex-col justify-between bg-white shadow-lg w-16 h-screen">
            <div className="">
                <NavElement src="/icons/logo.svg" to="/" className="hover:bg-white hover:border-none hover:rounded-none" />
                <NavElement src="/icons/dash.svg" className="mt-6" to="/dashboard" />
                <Divider />
                <NavElement src="/icons/content.svg" to="/manageblogs" />
            </div>
            <div className="">
                <NavElement src="/icons/register.svg" to="/register" className={`p-1`} />
                <NavElement src="/icons/login.svg" to="/login" className={`p-1`} />
                <NavElement src="/icons/logout.svg" to="/logout" className={`p-1`} />
                <NavElement src="/icons/pass.svg" to="/resetpassword" className={`p-1`} />
                <NavElement src="/icons/about.svg" to="/about" className={`p-1`} />
                <NavElement src="/icons/noti.svg" to="/editblog" />
                <Divider />
                {/* <NavElement src="https://firebasestorage.googleapis.com/v0/b/rapid-f23c9.appspot.com/o/H_img.jpg?alt=media&token=0ce84bea-7364-4997-81b3-db9b082cd1a7" className="rounded-full" to="/profile" /> */}
                <NavElement src="https://api.dicebear.com/8.x/lorelei/svg" className="rounded-full" to="/profile" />
            </div>
        </div>
    );
};


const NavElement = ({ src, alt, className, to }) => {
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            const response = await fetch('api/auth/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Add any necessary body data here
            });
            // Handle the response as needed
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoggingOut(false);
        }
    };

    const classNames = `w-10 mx-auto my-4 side-icon hover:bg-blue-200 hover:rounded-md hover:border hover:border-gray-300 ${className}`;

    return (
        <div>
            {to === '/logout' ? (
                // <button

                //     disabled={loggingOut}
                // >
                // </button>
                <img className={classNames} onClick={handleLogout} src={src} alt={alt} />
            ) : (
                <Link to={to}>
                    <img className={classNames} src={src} alt={alt} />
                </Link>
            )}
        </div>
    );
};


const Divider = () => <hr />;


export default SideBar;
