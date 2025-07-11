import SideBar from '../components/Sidebar.jsx';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
// import Editor from '../components/Editor';
import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLocalStorage } from "../hooks/customHooks"

import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from '../components/EditorTools'


const RenderBlog = ({ isPreview = false }) => {
    const { slug } = useParams();

    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [localBlogData, setLocalBlogData, removeLocalBlogData] = useLocalStorage('localBlogData');
    const [onPreviewPage, setOnPreviewPage, removeOnPreviewPage] = useLocalStorage('onPreviewPage');
    removeOnPreviewPage()

    const ReactEditorJS = createReactEditorJS()

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

    useEffect(() => {
        // Show a toast indicating data is being fetched

        const fetchBlogData = async () => {
            const toastId = toast.loading('Fetching blog data...');
            try {
                const response = await fetch(`/api/blog/published/${slug}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog data');
                }
                const data = await response.json();
                console.log(data);
                console.log(data.content);
                setBlogData(data);
            } catch (error) {
                setError(error.message);
                toast.error('Failed to fetch blog data. Please try again.');
            } finally {
                setLoading(false);
                toast.dismiss(toastId);
            }
        };
        if (slug !== undefined) {
            console.log("SLSUSUSJS");
            fetchBlogData();
        } else {
            console.log("HHHH   ");
            setBlogData(localBlogData);
            setLoading(false);
        }

    }, [slug, localBlogData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const { title, subtitle, content, attachments, publishDate, author, modificationDate } = blogData;

    return (
        <div>
            <SideBar />
            {/* <Navbar /> */}

            <div className='flex flex-col ml-16'>
                {/* <div className='flex flex-col bg-blue-500 ml-16 max-w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl'> */}


                <div className="px-8 py-8 w-screen max-w-4xl self-center">
                    <h1 className="mb-2 font-bold text-3xl">{title}</h1>
                    <h2 className="mb-4 text-gray-500 text-lg">{subtitle}</h2>
                    {author &&
                        <Link to={`/blogs?author=${author.username}`} className="mr-4 text-base text-blue-500 underline">
                            By {author.username}
                        </Link>
                    }
                    <div className="flex items-center mb-4 text-gray-600 text-sm">
                        <span className="mr-4">Published On: {formatDateTime(publishDate)}</span>
                        {modificationDate && (
                            <span>Last updated: {formatDateTime(modificationDate)}</span>
                        )}
                    </div>
                    <div className="prose">
                        {content && (
                            <ReactEditorJS
                                defaultValue={blogData.content[0]}
                                tools={EDITOR_JS_TOOLS}
                                readOnly={true}
                                minHeight={`40`}
                            />

                        )}
                    </div>
                    <div className="mt-8">
                        {attachments && (
                            <div className="">
                                <label htmlFor="attachmentLinks" className="block mb-2 font-medium text-gray-700 text-xl">Attachments :</label>
                                <ul className="">
                                    {blogData.attachments.map((attachment, index) => (
                                        <li key={index} className="ml-4 text-blue-500 underline list-disc">
                                            <a href={attachment.link} target="_blank" rel="noopener noreferrer">{attachment.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default RenderBlog;