// import { IoIosMore, IoIosArrowBack } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from 'react';
import SideBar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';


export default function ManageBlogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/api/blog/getblogs')
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    return (
        <div>
            <SideBar />
            <Navbar />
            <div className="flex flex-col mt-24 ml-16">
                <div className='flex flex-row justify-between m-4'>
                    <div className="flex flex-row">
                        <div className="flex flex-row gap-2 shadow focus:shadow-outline px-3 py-2">
                            <IoIosSearch size='28' className="" />
                            <input className="rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" type="text" name="author" id="author" placeholder="Your username" />
                        </div>
                        <div className="flex flex-row px-3 py-2 text-xl">
                            3 Records
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-row gap-2 px-3 py-2">
                            <div className="">Status</div>
                            <div className="flex flex-row hover:border-gray-500 px-1 border rounded-sm">All&nbsp;
                                <FaAngleDown className="mt-1" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 px-3 py-2">
                            <div className="">Created by</div>
                            <div className="flex flex-row hover:border-gray-500 px-1 border rounded-sm">All&nbsp;
                                <FaAngleDown className="mt-1" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="bg-gray-50 px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Title</th>
                                <th className="bg-gray-50 px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Slug</th>
                                <th className="bg-gray-50 px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">CreatedBy</th>
                                <th className="bg-gray-50 px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">CreatedAt</th>
                                <th className="bg-gray-50 px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">ModifiedBy</th>
                                <th className="bg-gray-50 px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">ModifiedAt</th>
                                <th className="bg-gray-50 px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => (
                                <tr key={blog._id} className="bg-white">
                                    <td className="px-6 py-4 whitespace-nowrap">{blog.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{blog.slug}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{blog.author.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{blog.modifiedBy ? blog.modifiedBy.name : ''}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{blog.modificationDate ? new Date(blog.modificationDate).toLocaleDateString() : ''}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{blog.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
