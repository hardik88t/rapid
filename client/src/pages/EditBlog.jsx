import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Blognav from '../components/Blognav';
import SideBar from '../components/Sidebar';
import SlateTextEditor from '../components/SlateTextEditor';
import Configbar from '../components/Configbar';

export default function Dashboard() {
    const { slug } = useParams();
    const editorInstance = useRef(null);
    const [blogData, setBlogData] = useState({ title: '', subtitle: '', body: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/blog/${slug}`);
                const data = await response.json();
                setBlogData(data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchData();
    }, [slug]);

    const handleSave = async () => {
        try {
            const savedData = await editorInstance.current.save();
            console.log(savedData);
            // Call your API to save the data
            // await saveData(savedData);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <div>
            <SideBar />
            <Blognav title={blogData.title} status={blogData.status} slug={slug} />
            <Configbar slug={blogData.slug} username={blogData.author} showAuthor={blogData.showAuthor} />

            <div className="flex flex-row mt-24 mr-72 ml-16 w-auto">
                <form className="w-screen" action="">
                    <div className="m-6">
                        <label htmlFor="title" className="block mb-2 font-medium text-gray-700 text-xl">Title</label>
                        <input className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" type="text" name="title" id="title" placeholder="Home Page" value={blogData.title} />
                    </div>
                    <div className="m-6">
                        <label htmlFor="subtitle" className="block mb-2 font-medium text-gray-700 text-xl">Sub Text</label>
                        <input className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" type="text" name="subtitle" id="subtitle" placeholder="This is a Home Page." value={blogData.subtitle} />
                    </div>
                    <div className="m-6">
                        <label htmlFor="slate" className="block mb-2 font-medium text-gray-700 text-xl">Body</label>
                        <SlateTextEditor value={blogData.body} />
                        <button onClick={handleSave} className="bg-blue-500 mt-4 px-4 py-2 rounded text-white">Save</button>
                    </div>
                    <div className="m-6">
                        <label htmlFor="attachments" className="block mb-2 font-medium text-gray-700 text-xl">Sub Text</label>
                        <input className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" multiple type="file" name="attachments" id="attachments" />
                    </div>
                </form>
            </div>
        </div>
    );
}





// import { useRef } from 'react';
// import Blognav from '../components/Blognav';
// import SideBar from '../components/Sidebar';
// import SlateTextEditor from '../components/SlateTextEditor';
// import Configbar from '../components/Configbar';

// export default function Dashboard() {
//     const editorInstance = useRef(null);

//     const handleSave = async () => {
//         try {
//             const savedData = await editorInstance.current.save();
//             console.log(savedData);
//             // Call your API to save the data
//             // await saveData(savedData);
//         } catch (error) {
//             console.error('Error saving data:', error);
//         }
//     };

//     return (
//         <div>
//             <SideBar />
//             <Blognav />
//             <Configbar />

//             <div className="flex flex-row mt-24 mr-72 ml-16 w-auto">
//                 <form className="w-screen" action="">
//                     <div className="m-6">
//                         <label htmlFor="title" className="block mb-2 font-medium text-gray-700 text-xl">Title</label>
//                         <input className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" type="text" name="title" id="title" placeholder="Home Page" />
//                     </div>
//                     <div className="m-6">
//                         <label htmlFor="subtitle" className="block mb-2 font-medium text-gray-700 text-xl">Sub Text</label>
//                         <input className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" type="text" name="subtitle" id="subtitle" placeholder="This is a Home Page." />
//                     </div>
//                     <div className="m-6">
//                         <label htmlFor="slate" className="block mb-2 font-medium text-gray-700 text-xl">Body</label>
//                         <SlateTextEditor />
//                         <button onClick={handleSave} className="bg-blue-500 mt-4 px-4 py-2 rounded text-white">Save</button>
//                     </div>
//                     <div className="m-6">
//                         <label htmlFor="attachments" className="block mb-2 font-medium text-gray-700 text-xl">Sub Text</label>
//                         <input className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" multiple type="file" name="attachments" id="attachments" />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
