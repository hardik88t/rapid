import { Link } from 'react-router-dom';


const Moredock = () => {
    return (
        <div className="flex flex-col border-gray-500 border rounded-md">
            <NavButton className='' content={'Preview'} />
            <NavButton className=' text-red-600' content={'Delete'} />
        </div>
    );
};

const NavButton = ({ content, to, className }) => {
    const classNames = `border py-2 px-4 hover:bg-blue-300 ${className}`;

    return (
        <Link to={to}>
            <div className={classNames}>
                {content}
            </div>
        </Link>
    );
};


export default Moredock;
