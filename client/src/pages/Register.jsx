import { useState } from 'react';
import SideBar from '../components/Sidebar.jsx';



const RegisterUserForm = () => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');


    const sendOtp = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth/sendotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            setOtpSent(true);
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError('Error sending OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, firstname, lastname, email, password, otp })
            });
            // Handle response
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Error registering user. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SideBar />
            <div className="flex flex-col items-center justify-center min-h-screen ml-16">
                {/* Logo and Heading */}
                <div className="flex items-center justify-center mb-6">
                    <img src="https://firebasestorage.googleapis.com/v0/b/rapid-f23c9.appspot.com/o/logo.svg?alt=media&token=a1d2d5b2-f1a3-4056-81f0-5d4cbf9cf2aa" alt="Logo" className="mr-2 h-7 w-7" />
                    <h2 className="text-xl font-semibold sm:text-3xl">Rapid Page Builder</h2>
                </div>
                {/* Register Form */}
                <form className="w-full max-w-md p-6 border-2 border-gray-400 rounded-lg">
                    {/* Username Input */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input id="username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
                    </div>

                    {/* Firstname Input */}
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input id="firstname" type="text" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
                    </div>

                    {/* Lastname Input */}
                    <div className="mb-4">
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input id="lastname" type="text" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                    </div>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
                    </div>
                    {/* Send OTP Button */}
                    <div className="mb-4">
                        <button type="button" onClick={sendOtp} className={`inline-block w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading || otpSent}>Send OTP</button>
                    </div>

                    {/* Verify OTP Input */}
                    {otpSent && (
                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
                            <input id="otp" type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
                        </div>
                    )}

                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
                    </div>
                    {/* Register Button */}
                    <div className="mb-4">
                        <button type="button" onClick={registerUser} className={`inline-block w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>Register</button>
                    </div>
                    <div className="text-center text">
                        <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Already have an account? Login</a>
                    </div>
                    {/* Error Message */}
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
        </>
    );
};

export default RegisterUserForm;