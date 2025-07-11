import { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useParams } from 'react-router-dom';


const Configbar = ({ blogData, setBlogData, isOpen, toggleSidebar }) => {
    const { slug } = useParams();
    let slugRoute = slug;
    const [key, setKey] = useState(0);

    const [slugError, setSlugError] = useState('');

    const handleSlugChange = async (e) => {
        const slug = e.target.value;
        setBlogData({ ...blogData, slug });
        if (slugRoute === slug) {
            console.log(slugRoute, "====", slug);
            setSlugError("");
        } else {

            try {
                const response = await fetch('/api/blog/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ slug }),
                });

                const data = await response.json();
                console.log
                if (response.ok) {
                    if (data.error) {
                        setSlugError('URL is in use!');
                    } else {
                        setSlugError('');
                    }
                } else {
                    setSlugError('Internal server error');
                }
            } catch (error) {
                console.error('Error validating slug:', error);
                setSlugError('Internal server error');
            }
        }
    };

    useEffect(() => {

        const fetchData = async () => {
            if (window.location.pathname === '/addblog') {
                const response = await fetch('/api/user');
                const userData = await response.json();
                setBlogData({ ...blogData, author: { username: userData.username } });
            }
        };

        fetchData();
    }, []);


    return (
        <div className={`${isOpen ? '' : 'hidden'}`}>
            <div className="top-0 right-0 fixed flex flex-col bg-white shadow-lg mt-24 pb-24 w-72 h-full">
                <div className="flex flex-row justify-between m-6">
                    <div className="">Configurations</div>
                    <RxCross2 size="28" className="" onClick={toggleSidebar} />
                </div>
                <Divider />
                <div className="">
                    <div className="m-6">
                        <label htmlFor="slug" className="block mb-2 font-bold text-gray-700 text-sm">
                            <span className="text-red-500">*</span> URL
                        </label>
                        <input
                            className="shadow px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                            type="text"
                            name="slug"
                            id="slug"
                            placeholder="URL"
                            value={blogData.slug}
                            onChange={handleSlugChange}
                        />
                        {slugError && <p className="text-red-500 text-xs italic">{slugError}</p>}
                    </div>
                    {blogData.author && (
                        <div className="m-6">
                            <label htmlFor="author" className="block mb-2 font-bold text-gray-700 text-sm">
                                Author
                            </label>
                            <input
                                disabled
                                className="shadow px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none"
                                type="text"
                                name="author"
                                id="author"
                                placeholder="Your username"
                                value={blogData.author.username}
                            />
                        </div>
                    )}
                    <div className="flex gap-3 m-6 align-middle">
                        <input
                            type="checkbox"
                            name="showAuthor"
                            id="showAuthor"
                            className=""
                            checked={blogData.showAuthor}
                            onChange={(e) => setBlogData({ ...blogData, showAuthor: e.target.checked })}
                        />
                        <label htmlFor="showAuthor" className="block font-medium text-gray-700 text-sm">
                            Show Author
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Divider = () => <hr />;

export default Configbar;
