import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BlogList = ({ blogs }) => {
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
                    <th className="bg-gray-50 px-6 py-3 font-medium text-base text-gray-500 text-left uppercase tracking-wider">Author</th>
                    <th className="bg-gray-50 px-6 py-3 font-medium text-base text-gray-500 text-left uppercase tracking-wider">ModifiedAt</th>
                    <th className="bg-gray-50 px-6 py-3 font-medium text-base text-gray-500 text-left uppercase tracking-wider">PublishedOn</th>
                </tr>
            </thead>

            <tbody>
                {blogs.map((blog, index) => {

                    return (
                        <tr key={blog._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="flex flex-row justify-between px-6 py-4 w-72">
                                <div className="">
                                    <Link to={`/blogs/${blog.slug}`}>
                                        {blog.title}
                                    </ Link>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-blue-500 hover:text-blue-900 whitespace-nowrap">
                                <Link to={`/blogs/${blog.slug}`}>
                                    /{blog.slug}
                                </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {(blog.author) ? blog.author.username : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(blog.modificationDate)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(blog.publishDate)}</td>
                        </tr>

                    )
                })}
            </tbody>
        </table >

    )
}



export default BlogList;