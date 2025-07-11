import { IoIosSearch } from "react-icons/io";
import Navbar from '../components/Navbar.jsx';
import BlogList from '../components/BlogList.jsx';
import SideBar from '../components/Sidebar.jsx';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);


    useEffect(() => {
        // Show a toast indicating data is being fetched
        const toastId = toast.loading('Fetching published blogs...');

        fetch('/api/blog/published')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch published blogs');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setBlogs(data);
                setFilteredBlogs(data);
                // Dismiss the toast when the data is fetched
                toast.dismiss(toastId);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
                // Dismiss the toast and show an error toast if fetching fails
                toast.dismiss(toastId);
                toast.error('Failed to fetch published blogs. Please try again.');
            });
    }, []);

    return (

        <div>
            <SideBar></SideBar>
            <Navbar />
            <div className='flex flex-col mt-24 ml-16' >
                <div className="">
                    <FilterBar blogs={blogs} setFilteredBlogs={setFilteredBlogs} filteredBlogs={filteredBlogs} />

                    <BlogList blogs={filteredBlogs} />
                </div>
            </div>
        </div>
    );
}






const FilterBar = ({ blogs, setFilteredBlogs, filteredBlogs }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [createdByFilter, setCreatedByFilter] = useState('All');

    const handleSearch = (e) => {
        const query = e.target.value.toString().toLowerCase();
        setSearchQuery(query);
        filterBlogs(query, createdByFilter);
    };


    const handleCreatedByFilter = (createdBy) => {
        setCreatedByFilter(createdBy);
        filterBlogs(searchQuery, createdBy);
    };

    const filterBlogs = (searchQuery, createdBy) => {
        let filteredBlogs = blogs.filter(blog =>
            typeof blog.title === 'string' && blog.title.trim().toLowerCase().includes(searchQuery)
        );

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
                    <div className="">Created by</div>
                    <div className="flex flex-row hover:border-gray-500 px-1 border rounded-sm">
                        <select
                            value={createdByFilter}
                            onChange={(e) => handleCreatedByFilter(e.target.value)}
                            className="bg-transparent border-none w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                        >
                            <option value="All">All</option>
                            {Array.from(new Set(blogs.map(blog => blog.author && blog.author.username)))
                                .filter(name => name)
                                .map(name => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};
