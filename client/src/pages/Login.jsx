import SideBar from '../components/Sidebar.jsx';
import { useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                // Handle successful login
                console.log("LOGGED IN");
            } else {
                // Handle login failure
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <>
            <SideBar></SideBar>

            <div className="flex flex-col items-center justify-center min-h-screen ml-16">
                {/* Logo and Heading */}
                <div className="flex items-center justify-center mb-6">
                    <img src="https://firebasestorage.googleapis.com/v0/b/rapid-f23c9.appspot.com/o/logo.svg?alt=media&token=a1d2d5b2-f1a3-4056-81f0-5d4cbf9cf2aa" alt="Logo" className="mr-2 h-7 w-7" />
                    <h2 className="text-xl font-semibold sm:text-3xl">Rapid Page Builder</h2>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full max-w-md p-6 border-2 border-gray-400 rounded-lg">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email or Username</label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <button type="submit" className="inline-block px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign In</button>
                    </div>
                    <div className="flex items-center justify-between mb-4">
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
