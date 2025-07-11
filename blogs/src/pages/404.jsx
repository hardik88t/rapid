import SideBar from '../components/Sidebar.jsx';
import { Link } from 'react-router-dom';

export default function Error404() {
    return (
        <>
            <SideBar />
            {/* <Configbar /> */}

            <div className='flex flex-row justify-center mt-40 ml-16 pr-16 w-screen h-screen align-middle'>
                <NoBlog />
            </div>

        </>
    );
}


const NoBlog = () => {
    return (
        <div className="flex flex-row gap-6 border-gray-300 p-9 border rounded-lg w-fit h-96">
            <div className="flex flex-col justify-center ml-6">
                <div className="flex flex-col">
                    <div className="m-2 font-bold text-3xl text-center">
                        404 ! Page Not Found.
                    </div>
                    <div className="m-2 text-base text-center text-gray-500">
                        Looks like there was some problem with address.
                    </div>
                    <div className='flex justify-center mt-9' >
                        <NavButton content={"Go To Dashboard ->"} to={'/dashboard'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const NavButton = ({ content, to, className }) => {
    const classNames = `border border-gray-500 py-2 px-4 mx-2 bg-blue-500 bg-opacity-80 rounded-lg hover:bg-opacity-100 ${className}`;

    return (
        <Link to={to}>
            <div className={classNames}>
                {content}
            </div>
        </Link>
    );
};       