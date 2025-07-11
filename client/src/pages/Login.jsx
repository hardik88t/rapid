import SideBar from '../components/Sidebar.jsx';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocalStorage } from "../hooks/customHooks"


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localUser, setLocalUser, removeLocalUser] = useLocalStorage('localUser');



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Show a toast indicating login is in progress
        const toastId = toast.loading('Logging in...');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                toast.success('Login successful.');
                await fetch('/api/user/')
                    .then(response => response.json())
                    .then(data => {
                        setLocalUser(data)
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });

                console.log("LOGGED IN");
                window.location.href = '/manageblogs';
            } else {
                toast.error('Failed to login. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Failed to login. Please try again.');
        } finally {
            toast.dismiss(toastId);
        }
    };

    return (
        <>
            <SideBar></SideBar>

            <div className="flex flex-col justify-center items-center ml-16 min-h-screen">
                {/* Logo and Heading */}
                <div className="flex justify-center items-center mb-6">
                    <img src="https://firebasestorage.googleapis.com/v0/b/rapid-f23c9.appspot.com/o/logo.svg?alt=media&token=a1d2d5b2-f1a3-4056-81f0-5d4cbf9cf2aa" alt="Logo" className="mr-2 w-7 h-7" />
                    <h2 className="font-semibold text-xl sm:text-3xl">Rapid Page Builder</h2>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="border-2 border-gray-400 p-6 rounded-lg w-full max-w-md">
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium text-gray-700 text-sm">Email or Username</label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-medium text-gray-700 text-sm">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <button type="submit" className="inline-block bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign In</button>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-center text">
                            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">New User? Register Now!</a>
                        </div>
                        <div className="text">
                            <a href="/resetpassword" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot Password?</a>
                        </div>

                    </div>

                </form>
            </div>
        </>
    );
}

export default LoginForm;
