import SideBar from '../components/Sidebar.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const ResetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

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
            // Handle response
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError('Error sending OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp, newPassword })
            });
            // Handle response
            // Redirect to login page after successful password reset
            navigate('/login'); // Use navigate instead of history.push
        } catch (error) {
            console.error('Error resetting password:', error);
            setError('Error resetting password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SideBar />
            <div className="flex flex-col justify-center items-center ml-16 min-h-screen">
                {/* Logo and Heading */}
                <div className="flex justify-center items-center mb-6">
                    <img src="https://firebasestorage.googleapis.com/v0/b/rapid-f23c9.appspot.com/o/logo.svg?alt=media&token=a1d2d5b2-f1a3-4056-81f0-5d4cbf9cf2aa" alt="Logo" className="mr-2 w-7 h-7" />
                    <h2 className="font-semibold text-xl sm:text-3xl">Rapid Page Builder</h2>
                </div>
                {/* Forgot Password Form */}
                <form className="border-2 border-gray-400 p-6 rounded-lg w-full max-w-md">
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium text-gray-700 text-sm">Email</label>
                        <input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
                    </div>
                    {/* Send OTP Button and OTP Input Box */}
                    <div className="flex mb-4">
                        <div className="w-1/3">
                            <button type="button" onClick={sendOtp} className={`w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>Send OTP</button>
                        </div>
                        <div className="flex justify-center ml-2 w-2/3">
                            {/* <label htmlFor="otp" className="block font-medium text-gray-700 text-sm">Enter OTP</label> */}
                            <input id="otp" type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="block border-gray-300 focus:border-indigo-500 shadow-sm px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-indigo-500 sm:text-sm" required placeholder='Enter OTP' />
                        </div>
                    </div>
                    {/* New Password Input */}
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block font-medium text-gray-700 text-sm">New Password</label>
                        <input id="newPassword" type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
                    </div>
                    {/* Reset Password Button */}
                    <div className="mb-4">
                        <button type="button" onClick={resetPassword} className={`inline-block w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>Reset Password</button>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-center text">
                            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login</a>
                        </div>
                        <div className="text-center text">
                            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">New User? Register Now!</a>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
        </>
    );
};

export default ResetPasswordForm;