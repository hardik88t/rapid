import { LuAlignLeft } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Blognav from '../components/Blognav';
import SideBar from '../components/Sidebar';
// import Editor from '../components/Editor';
import Configbar from '../components/Configbar';
import DatePicker from '../components/DatePicker'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../components/firebase.jsx';
import { toast } from 'react-hot-toast';
import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from '../components/EditorTools'
import { useLocalStorage } from "../hooks/customHooks"

export default function AddBlog({ isAddBlog }) {
    const emptyBlog = { title: '', subtitle: '', content: [{}], attachments: [], showAuthor: true }
    const ReactEditorJS = createReactEditorJS()
    let storedInLocal = true;
    const { slug } = useParams();
    const [key, setKey] = useState(0);
    console.log("THIS IS ON ADD PAGE PAGE")
    // window.localStorage.setItem("localBlogData", JSON.stringify(emptyBlog));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [localBlogData, setLocalBlogData, removeLocalBlogData] = useLocalStorage('localBlogData');
    if (localBlogData === undefined) {
        setLocalBlogData(emptyBlog);
    }
    const [blogData, setBlogData] = useState(localBlogData);
    // const [blogData, setBlogData] = useState({ title: '', subtitle: '', content: [{}], attachments: [], showAuthor: true });
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (storedInLocal) {
            setBlogData(localBlogData);
            storedInLocal = false;
        }
    }, [])

    useEffect(() => {
        // setLocalBlogData(blogData);
        localStorage.setItem("localBlogData", JSON.stringify(blogData));
    }, [blogData, setLocalBlogData])

    const handleContentChange = (newContent) => {
        newContent.saver.save()
            .then((resolve) => {
                // console.log("Saved content:", resolve);
                setBlogData((prevState) => ({ ...prevState, content: [resolve] }));
            })
            .catch((error) => {
                console.error("Error saving content:", error);
            });
    };




    const handlePublish = () => {
        setShowDatePicker(!showDatePicker);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    const handleFileInputChange = (e) => {
        const files = e.target.files;
        const updatedAttachments = [...blogData.attachments];

        Array.from(files).forEach(async (file) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            const toastId = toast.loading('Uploading file...', { duration: Infinity });

            try {
                await uploadTask;
                const downloadURL = await getDownloadURL(storageRef);

                // Store attachment name (default file name) and download link in the attachments array
                updatedAttachments.push({ name: file.name, link: downloadURL });
                setBlogData((prevState) => ({
                    ...prevState,
                    attachments: updatedAttachments,
                }));

                toast.dismiss(toastId);
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.dismiss(toastId);
                toast.error('Failed to upload file.');
            }
        });
    };


    useEffect(() => {
        if (!isAddBlog) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/blog/${slug}`);
                    const data = await response.json();
                    setBlogData(data);
                    setKey(key => key + 1);
                    console.log("GET", data);
                } catch (error) {
                    console.error('Error fetching blog data:', error);
                }
            };
            fetchData();

        } else {
            setBlogData(localBlogData);
        }

        // return () => {
        //     console.log("REMOVED")
        // }
    }, [slug]);

    const handleDeleteAttachment = (index) => {
        setBlogData((prevData) => {
            const updatedAttachments = [...prevData.attachments];
            updatedAttachments.splice(index, 1);
            return { ...prevData, attachments: updatedAttachments };
        });
    };

    const handleEditAttachmentName = (index, newName) => {
        setBlogData((prevData) => {
            const updatedAttachments = [...prevData.attachments];
            updatedAttachments[index].name = newName;
            return { ...prevData, attachments: updatedAttachments };
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancel = () => {
        localStorage.removeItem("localBlogData");
        window.location.href = '/manageblogs';
    };
    const handleClear = () => {
        localStorage.removeItem("localBlogData");
        setBlogData(emptyBlog);
        window.location.reload();
    };

    const handleSave = async () => {
        // Show a toast indicating data is being saved
        const toastId = toast.loading('Saving blog data...');

        try {
            const url = isAddBlog ? '/api/blog/create' : `/api/blog/update/${slug}`;
            const response = await fetch(url, {
                method: isAddBlog ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blogData)
            });
            if (response.ok) {
                toast.success('Blog data saved successfully.');
                localStorage.removeItem("localBlogData");
                window.location.href = '/manageblogs';
            } else {
                console.error('Failed to save blog content:', response.statusText);
                toast.error('Failed to save blog data. Please try again.');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Failed to save blog data. Please try again.');
        } finally {
            toast.dismiss(toastId);
        }
    };



    return (
        <div className={`${showDatePicker ? '' : ''}`} >
            <SideBar />
            <Configbar blogData={blogData} setBlogData={setBlogData} isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <Blognav
                title={blogData.title}
                status={blogData.status}
                slug={slug}
                onCancel={handleCancel}
                onSave={handleSave}
                onPublish={handlePublish}
                onClear={handleClear}
            />



            <div className={`flex flex-row mt-24 ml-16 w-auto ${isOpen ? 'mr-72' : ''} `}>
                {showDatePicker &&
                    <div className="z-10 fixed flex justify-center bg-slate-300 bg-opacity-70 w-screen h-screen align-middle">
                        <div className="z-20 fixed bg-slate-200">
                            <DatePicker
                                blogData={blogData}
                                setBlogData={setBlogData}
                                onCancel={handleCancel}
                                onSave={handleSave}
                                onPublish={handlePublish}
                            />
                        </div>
                    </div>
                }

                <LuAlignLeft className={`top-24 right-0 fixed m-6 w-6 h-6 ${isOpen ? 'hidden' : 'visible'}`} onClick={toggleSidebar} />

                <form className="w-screen" action="">
                    <div className="m-6">
                        <label htmlFor="title" className="block mb-2 font-medium text-gray-700 text-xl">
                            <span className="text-red-500">*</span>
                            Title
                        </label>
                        <input
                            className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Home Page"
                            value={blogData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="m-6">
                        <label htmlFor="subtitle" className="block mb-2 font-medium text-gray-700 text-xl">
                            <span className="text-red-500">*</span>
                            Sub Text
                        </label>
                        <input
                            className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                            type="text"
                            name="subtitle"
                            id="subtitle"
                            placeholder="This is a Home Page."
                            value={blogData.subtitle}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="m-6">
                        <label htmlFor="slate" className="block mb-2 font-medium text-gray-700 text-xl">Body</label>
                        <div className="shadow focus:shadow-outline px-20 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                        >


                            <ReactEditorJS
                                defaultValue={blogData.content[0]}
                                tools={EDITOR_JS_TOOLS}
                                key={key} // Force re-render when key changes
                                onChange={handleContentChange}
                                minHeight={`40`}
                            />

                        </div>
                    </div>
                    {/* Display attachment links */}
                    <div className="m-6">
                        {blogData.attachments && (
                            <div className="">
                                <label htmlFor="attachmentLinks" className="block mb-2 font-medium text-gray-700 text-xl">Attachment Links</label>
                                <ul className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none">
                                    <li className="flex justify-between items-center m-2">
                                        <div className="px-3 py-2 w-1/2 text-black">Edit Name</div>
                                        <div className="px-3 py-2 text-black">Name</div>
                                        <div className="px-3 py-2 text-red-700">Remove</div>
                                    </li>
                                    <hr />
                                    {blogData.attachments.map((attachment, index) => (
                                        <li key={index} className="flex justify-between items-center m-2">
                                            <input
                                                className="px-3 py-2 border rounded w-1/2 text-gray-700 leading-tight appearance-none focus:outline-none"
                                                type="text"
                                                value={attachment.name}
                                                onChange={(e) => handleEditAttachmentName(index, e.target.value)}
                                            />
                                            <a href={attachment.link} className="hover:bg-blue-200 px-3 py-2 border rounded-md text-blue-700" target="_blank" rel="noopener noreferrer">{attachment.name}</a>

                                            <button className="bg-red-100 hover:bg-red-300 px-3 py-2 border border-red-500 rounded-md text-red-700" onClick={() => handleDeleteAttachment(index)}>Delete</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="m-6">
                        <label htmlFor="attachments" className="block mb-2 font-medium text-gray-700 text-xl">Attachments</label>
                        <input
                            className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                            multiple
                            type="file"
                            name="attachments"
                            id="attachments"
                            onChange={handleFileInputChange}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}