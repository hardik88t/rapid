// import { IoIosMore, IoIosArrowBack } from "react-icons/io";
import { IoIosMore, IoIosArrowBack } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from 'react';
import SideBar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import StatusComponent from '../components/StatusComponent.jsx'
import Moreoption from "../components/Moreoption.jsx";
import NoBlog from '../components/NoBlog.jsx';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function ManageBlogs({ myBlogsOnly = false }) {
    const [blogsPresent, setBlogsPresent] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    useEffect(() => {
        const toastId = toast.loading('Fetching blogs...');
        let ULRcall = '/api/blog/getblogs'
        if (myBlogsOnly) {
            ULRcall = '/api/blog'
        }

        fetch(ULRcall)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                return response.json();
            })
            .then(data => {
                if (data[0].slug !== undefined) {
                    setBlogs(data);
                    setFilteredBlogs(data);
                    setBlogsPresent(true);
                }
                toast.dismiss(toastId);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
                toast.error('Failed to fetch blogs. Please try again.');
            });
    }, [myBlogsOnly]);

    return (
        <div>
            <SideBar />
            <Navbar />
            <div className="flex flex-col mt-24 ml-16">
                <div className="">
                    <FilterBar blogs={blogs} setFilteredBlogs={setFilteredBlogs} filteredBlogs={filteredBlogs} />
                    <ContentTable blogs={filteredBlogs} blogsPresent={blogsPresent} setBlogsPresent={setBlogsPresent} />
                    {
                        <div className={`${(filteredBlogs.length === 0) ? 'visible m-32' : 'hidden'}`}>
                            <NoBlog contentHead={'No Blogs Here !'} to='/addblog' />
                        </div>

                    }
                </div>
            </div>
        </div>
    );
}


const ContentTable = ({ blogs, blogsPresent, setBlogsPresent }) => {
    const formatDateTime = (dateTime) => {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        return `${formattedDate}, ${formattedTime}`;
    };

    return (
        <table className="min-w-full">
            <thead>
                <tr>
                    <th className="bg-gray-50 px-6 py-3 font-medium text-base text-gray-500 text-left uppercase tracking-wider">Title</th>
                    <th className="bg-gray-50 px-6 py-3 font-medium text-base text-gray-500 text-left uppercase tracking-wider">Slug</th>
                    <th className="bg-gray-50 px-6 py-3 font-medium text-base text-gray-500 text-left uppercase tracking-wider">CreatedBy</th>
                    <th className="bg-gray-50 px-6 py-3 font-medium text-base text-gray-500 text-left uppercase tracking-wider">CreatedAt</th>
                    <th className="bg-gray-50 px-6 py-3 font-medium text-base text-gray-500 text-left uppercase tracking-wider">ModifiedBy</th>
                    <th className="bg-gray-50 px-6 py-3 font-medium text-base text-gray-500 text-left uppercase tracking-wider">ModifiedAt</th>
                    <th className="bg-gray-50 px-6 py-3 font-medium text-base text-gray-500 text-left uppercase tracking-wider">PublishOn</th>
                    <th className="bg-gray-50 px-6 py-3 font-medium text-base text-gray-500 text-left uppercase tracking-wider">Status</th>
                </tr>
            </thead>

            {
                (blogsPresent) && (

                    <tbody>
                        {blogs.map((blog, index) => {
                            const buttons = [
                                // { content: "Preview", className: "text-green-600", to: `/previewblog/${blog.slug}`, type: 'button' },
                                // { content: "Edit", className: "text-blue-600 border-b-black", to: `/editblog/${blog.slug}`, type: 'button' },
                                { content: "Delete", className: "text-red-600 border-b-black", to: `/api/blog/deleteblog/${blog.slug}`, type: 'call', method: 'DELETE' },
                                { content: "Publish", className: "text-green-600", to: `/api/blog/publish/${blog.slug}`, type: 'call', method: 'POST' },
                                { content: "Schedule", className: "text-blue-600", to: `/api/blog/schedule/${blog.slug}`, type: 'call', method: 'POST' },
                                { content: "Draft", className: "text-yellow-600", to: `/api/blog/draft/${blog.slug}`, type: 'call', method: 'POST' },
                            ];

                            return (
                                <tr key={blog._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="flex flex-row justify-between px-6 py-4 w-72" >
                                        <Link to={`/editblog/${blog.slug}`}>
                                            <div className="text-blue-700 hover:cursor-context-menu">
                                                {blog.title}
                                            </div>
                                        </Link>
                                        <Moreoption classNames={"bg-yellow-600"} buttons={buttons} position={'bottom'} />
                                    </td>
                                    <td className="px-6 py-4 text-blue-700 whitespace-nowrap">
                                        <Link to={`/previewblog/${blog.slug}`}>
                                            /{blog.slug}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{blog.author.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(blog.createdAt)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{blog.modifiedBy ? blog.modifiedBy.username : ''}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(blog.modificationDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(blog.publishDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusComponent status={blog.status} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                )
            }
        </table >

    )
}






const FilterBar = ({ blogs, setFilteredBlogs, filteredBlogs }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [createdByFilter, setCreatedByFilter] = useState('All');

    const handleSearch = (e) => {
        const query = e.target.value.toString().toLowerCase();
        setSearchQuery(query);
        filterBlogs(query, statusFilter, createdByFilter);
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        filterBlogs(searchQuery, status, createdByFilter);
    };

    const handleCreatedByFilter = (createdBy) => {
        setCreatedByFilter(createdBy);
        filterBlogs(searchQuery, statusFilter, createdBy);
    };

    const filterBlogs = (searchQuery, status, createdBy) => {
        let filteredBlogs = blogs.filter(blog =>
            typeof blog.title === 'string' && blog.title.trim().toLowerCase().includes(searchQuery)
        );

        if (status !== 'All') {
            filteredBlogs = filteredBlogs.filter(blog => blog.status === status);
        }

        if (createdBy !== 'All') {
            filteredBlogs = filteredBlogs.filter(blog => blog.author.username === createdBy);
        }

        setFilteredBlogs(filteredBlogs);
    };

    return (
        <div className='flex flex-row justify-between m-4'>
            <div className="flex flex-row">
                <div className="flex flex-row gap-2 shadow focus:shadow-outline px-3 py-2">
                    <IoIosSearch size='28' className="" />
                    <input
                        className="rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <div className="flex flex-row px-3 py-2 text-xl">
                    {filteredBlogs.length} Records
                </div>
            </div>
            <div className="flex flex-row">
                <div className="flex flex-row gap-2 px-3 py-2">
                    <div className="">Status</div>
                    <div className="flex flex-row hover:border-gray-500 px-1 border rounded-sm">
                        <select
                            value={statusFilter}
                            onChange={(e) => handleStatusFilter(e.target.value)}
                            className="bg-transparent border-none w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                        >
                            <option value="All">All</option>
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                            <option value="Scheduled">Scheduled</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-row gap-2 px-3 py-2">
                    <div className="">Created by</div>
                    <div className="flex flex-row hover:border-gray-500 px-1 border rounded-sm">
                        <select
                            value={createdByFilter}
                            onChange={(e) => handleCreatedByFilter(e.target.value)}
                            className="bg-transparent border-none w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                        >
                            <option value="All">All</option>
                            {Array.from(new Set(blogs.map(blog => blog.author.username))).map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};
