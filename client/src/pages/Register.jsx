import { useState, useEffect } from 'react';
import SideBar from '../components/Sidebar.jsx';
import { toast } from 'react-hot-toast';



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

    // const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    useEffect(() => {
        const validateUsername = async () => {
            const usernameRegex = /^[a-zA-Z0-9_-]+$/;
            if (!usernameRegex.test(username)) {
                setUsernameError('Username must only contain letters, numbers, underscores, and dashes.');
                return;
            }
            try {
                const response = await fetch('/api/auth/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username })
                });
                const data = await response.json();
                if (response.ok) {
                    setUsernameError('');
                } else {
                    setUsernameError(data.error);
                }
            } catch (error) {
                console.error('Error validating username:', error);
            }
        };
        if (username !== '') {
            validateUsername();
        }

    }, [username]);


    const sendOtp = async () => {
        setLoading(true);
        // Show a toast indicating OTP is being sent
        const toastId = toast.loading('Sending OTP...');

        try {
            const response = await fetch('/api/auth/sendotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            setOtpSent(true);
            toast.success('OTP sent successfully.');
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError('Error sending OTP. Please try again.');
            toast.error('Failed to send OTP.');
        } finally {
            setLoading(false);
            toast.dismiss(toastId);
        }
    };

    const registerUser = async () => {
        setLoading(true);
        // Show a toast indicating registration is in progress
        const toastId = toast.loading('Registering user...');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, firstname, lastname, email, password, otp })
            });
            if (response.ok) {
                toast.success('User registered successfully.');
                window.location.href = '/login';
            } else {
                toast.error('Failed to register user. Please try again.');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Error registering user. Please try again.');
            toast.error('Failed to register user. Please try again.');
        } finally {
            setLoading(false);
            toast.dismiss(toastId);
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
                {/* Register Form */}
                <form className="border-2 border-gray-400 p-6 rounded-lg w-full max-w-md">
                    {/* Username Input */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block font-medium text-gray-700 text-sm">Username/author</label>
                        <input id="username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
                        {usernameError && <p className="mt-1 text-red-500 text-sm">{usernameError}</p>}
                    </div>

                    {/* Firstname Input */}
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block font-medium text-gray-700 text-sm">First Name</label>
                        <input id="firstname" type="text" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
                    </div>

                    {/* Lastname Input */}
                    <div className="mb-4">
                        <label htmlFor="lastname" className="block font-medium text-gray-700 text-sm">Last Name</label>
                        <input id="lastname" type="text" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                    </div>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium text-gray-700 text-sm">Email</label>
                        <input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
                    </div>
                    {/* Send OTP Button */}
                    <div className="mb-4">
                        <button type="button" onClick={sendOtp} className={`inline-block w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading || otpSent}>Send OTP</button>
                    </div>

                    {/* Verify OTP Input */}
                    {otpSent && (
                        <div className="mb-4">
                            <label htmlFor="otp" className="block font-medium text-gray-700 text-sm">Enter OTP</label>
                            <input id="otp" type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
                        </div>
                    )}

                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-medium text-gray-700 text-sm">Password</label>
                        <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
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