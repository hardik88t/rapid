import SideBar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { useCustomFBToken } from '../hooks/customHooks.jsx';

export default function About() {
    // const [firebaseToken, removeFirebaseToken] = useCustomFBToken();
    // console.log(firebaseToken);
    // const [localUser, setLocalUser, removeLocalUser] = useLocalStorage('localUser');


    // if (!localUser.username) {
    //     window.location.href = "/login";
    // }

    return (
        <div>
            <SideBar />
            <Navbar />

            <div className='flex justify-center items-center mt-24 ml-16 w-screen align-middle'>
                <div className='mx-auto p-3 max-w-2xl text-pretty'>
                    <div>
                        <h1 className='my-7 font-semibold text-3xl text-center font'>
                            About Rapid Page Builder
                        </h1>
                        <div className='flex flex-col gap-6 text-gray-500 text-lg'>
                            <p>
                                Rapid Page Builder is a powerful tool designed to help you create and publish web pages quickly and easily. With our intuitive interface, you can build beautiful pages without any coding knowledge.
                            </p>

                            <p>
                                Our platform is perfect for businesses, entrepreneurs, and individuals looking to create professional-looking pages without the hassle. Whether you are building a landing page, sales page, or personal website, Rapid Page Builder has everything you need to get started.
                            </p>

                            <p>
                                With features like customizable templates, drag-and-drop functionality, and real-time editing, you can create stunning pages in minutes. Plus, our platform is mobile-responsive, so your pages will look great on any device.
                            </p>

                            <p>
                                Get started with Rapid Page Builder today and see how easy it is to create beautiful, high-converting pages in no time!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}