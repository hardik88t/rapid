import { Link } from 'react-router-dom';


const SideBar = () => {
    return (
        <div className="top-0 left-0 z-20 fixed flex flex-col justify-between bg-white shadow-lg w-16 h-screen">
            <div className="">
                <NavElement src="/icons/logo.svg" to="/" className="hover:bg-white hover:border-none hover:rounded-none" />
                <NavElement src="/icons/dash.svg" className="mt-6" to="/" />
                <Divider />
            </div>
            <div className="">
                <NavElement src="/icons/transfer.svg" to="http://localhost:4000" className={`p-1`} />
                <NavElement src="/icons/about.svg" to="/" className={`p-1`} />
                <NavElement src="/icons/noti.svg" to="/" />
                <Divider />
                <NavElement src="https://api.dicebear.com/8.x/lorelei/svg" className="rounded-full" to="/" />
            </div>
        </div>
    );
};



const NavElement = ({ src, alt, className, to }) => {
    const classNames = `w-10 mx-auto my-4 side-icon hover:bg-blue-200 hover:rounded-md hover:border hover:border-gray-300 ${className}`;

    return (
        <div>
            <Link to={to}>
                <img className={classNames} src={src} alt={alt} />
            </Link>
        </div>
    );
};

const Divider = () => <hr />;


export default SideBar;
