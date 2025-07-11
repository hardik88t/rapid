// import { FaArrowCircleRight } from "react-icons/fa";
// import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
// import { FaFire, FaPoo } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLocalStorage } from "../hooks/customHooks"


const SideBar = () => {
    const [localUser, setLocalUser, removeLocalUser] = useLocalStorage('localUser');
    const [onAddPage, setOnAddPage, removeOnAddPage] = useLocalStorage('onAddPage');
    const [localBlogData, setLocalBlogData, removeLocalBlogData] = useLocalStorage('localBlogData');


    const location = useLocation();
    const currentRoute = location.pathname;
    let toLogin = true;

    if (currentRoute === "/blogs") {
        window.location.href = 'http://localhost:4100';
    }
    if (localStorage.getItem('localUser') === null) {

        if (currentRoute === "/login" || currentRoute === "/register" || currentRoute === "/resetpassword") {
            toLogin = false;
        }
        if (toLogin) {
            console.log(toLogin, currentRoute, "==========");
            // navigate('/login');            
            window.location.href = '/login';
            console.log("LLLLL");
        }
    }
    else {
        if (currentRoute === "/login" || currentRoute === "/register") {
            window.location.href = '/';
        }
    }

    return (
        <div className="top-0 left-0 z-20 fixed flex flex-col justify-between bg-white shadow-lg w-16 h-screen">
            <div className="">
                <NavElement src="/icons/logo.svg" to="/" className="hover:bg-white hover:border-none hover:rounded-none" />
                <NavElement src="/icons/dash.svg" className="mt-6" to="/dashboard" />
                <Divider />
                <NavElement src="/icons/content.svg" to="/manageblogs" />
                <NavElement src="/icons/addblog.svg" to="/addblog" className={`p-1`} />
            </div>
            <div className="">
                {/* <NavElement src="/icons/list.svg" to="http://localhost:4100" className={`p-1`} /> */}
                <NavElement src="/icons/login.svg" to="/login" className={`p-1`} />
                <NavElement src="/icons/register.svg" to="/register" className={`p-1`} />
                <NavElement src="/icons/pass.svg" to="/resetpassword" className={`p-1`} />
                <NavElement src="/icons/logout.svg" to="/logout" className={`p-1`} />
                <NavElement src="/icons/transfer.svg" to="http://localhost:4100" className={`p-1`} />
                <NavElement src="/icons/about.svg" to="/about" className={`p-1`} />
                <NavElement src="/icons/noti.svg" to="/addblog" /> {/* //TODO */}
                <Divider />
                {
                    localUser && (
                        <NavElement src={localUser.profilePicture || "https://api.dicebear.com/8.x/lorelei/svg"} className="rounded-full" to="/profile" />
                    )
                }
                {
                    !localUser && (
                        <NavElement src="https://api.dicebear.com/8.x/lorelei/svg" className="rounded-full" to="/profile" />
                    )
                }
            </div>
        </div>
    );
};



const NavElement = ({ src, alt, className, to }) => {
    const [loggingOut, setLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoggingOut(true);
        // Show a toast indicating logout is in progress
        const toastId = toast.loading('Logging out...');

        try {
            const response = await fetch('api/auth/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            window.localStorage.removeItem('localUser');
            toast.success('Logout successful.');
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error('Failed to logout. Please try again.');
        } finally {
            toast.dismiss(toastId);
            setLoggingOut(false);
        }
    };

    const classNames = `w-10 mx-auto my-4 side-icon hover:bg-blue-200 hover:rounded-md hover:border hover:border-gray-300 ${className}`;

    return (
        <div>
            {to === '/logout' ? (
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
