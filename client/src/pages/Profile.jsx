import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import SideBar from '../components/Sidebar.jsx';
import { useLocalStorage } from "../hooks/customHooks"
import { app } from '../components/firebase'; // Assuming you have initialized Firebase in a separate file
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';


const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(null);
    const [localUser, setLocalUser, removeLocalUser] = useLocalStorage('localUser');


    const uploadByFile = async (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Show a toast indicating file upload is in progress
        const toastId = toast.loading('Uploading file...');

        try {
            await uploadTask;
            const downloadURL = await getDownloadURL(storageRef);
            // Dismiss the toast when the upload is complete
            toast.success('File uploaded successfully.');
            return {
                success: 1,
                file: {
                    url: downloadURL,
                },
            };
        } catch (error) {
            console.error('Error uploading file:', error);
            // Dismiss the toast and show an error toast if the upload fails
            toast.error('File upload failed.');
            return {
                success: 0,
                message: 'File upload failed',
            };
        } finally {
            // Dismiss the toast when the upload process is complete (whether successful or failed)
            toast.dismiss(toastId);
        }
    }
    useEffect(() => {
        const toastId = toast.loading('Saving User data...');

        fetch('/api/user/')
            .then(response => response.json())
            .then(data => {
                setUser(data);
                // toast.success('User data saved successfully.');
                setFormData(data);
                setLoading(false);
                setLocalUser(data)
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                toast.error('Failed to get user data. Please try again.');
                setLoading(false);
            });

        toast.dismiss(toastId);

    }, []);

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Saving User data...');

        try {
            // Upload profile picture if a file is selected
            let profilePictureUrl = formData.profilePicture;
            if (formData.profilePicture instanceof File) {
                const uploadResult = await uploadByFile(formData.profilePicture);
                if (uploadResult.success) {
                    profilePictureUrl = uploadResult.file.url;
                } else {
                    console.error('Failed to upload profile picture');
                    toast.error('Failed to save user data. Please try again.');
                    return;
                }
            }

            // Update form data with the profile picture URL
            const updatedFormData = { ...formData, profilePicture: profilePictureUrl };

            // Send the updated form data to the server
            const response = await fetch(`/api/user/update/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData)
            });

            if (response.ok) {
                toast.success('User data saved successfully.');
                toast.dismiss(toastId);
                window.location.href = '/profile';
            } else {
                console.error('Failed to save user data:', response.statusText);
                toast.error('Failed to save user data. Please try again.');
            }

        } catch (error) {
            console.error('Error updating user data:', error);
            toast.error('Failed to save user data. Please try again.');

        } finally {
            toast.dismiss(toastId);
        }
    };
    return (
        <>
            <SideBar></SideBar>

            <div className='flex justify-center items-center ml-16 h-screen align-middle'>
                {loading ? (
                    <p>Loading user data...</p>
                ) : user ? (
                    <div className="bg-white shadow-lg mx-auto p-8 rounded-lg max-w-lg">
                        <h1 className="flex flex-row mb-4 font-bold text-3xl">
                            <img src={`${user.profilePicture}`} alt="pfp" width={200} className='p-3' />
                            <div>
                                Welcome,
                                <br />
                                {user.username}
                            </div>
                        </h1>
                        <p className="mb-2"><span className="font-semibold">ID:</span> {user._id}</p>
                        <p className="mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
                        <p className="mb-2"><span className="font-semibold">First Name:</span> {user.firstname}</p>
                        <p className="mb-2"><span className="font-semibold">Last Name:</span> {user.lastname}</p>
                        <p className="mb-2"><span className="font-semibold">Role:</span> {user.role}</p>
                        <p className="mb-2"><span className="font-semibold">Profile Picture:</span> {user.profilePicture}</p>
                        <p className="mb-2"><span className="font-semibold">Is Subscribed:</span> {user.isSubscribed ? 'Yes' : 'No'}</p>
                        <p className="mb-2"><span className="font-semibold">Is Two Factor Enabled:</span> {user.isTwoFactorEnabled ? 'Yes' : 'No'}</p>
                        <p className="mb-2"><span className="font-semibold">Address:</span> {JSON.stringify(user.address)}</p>
                        <p className="mb-2"><span className="font-semibold">Phone Number:</span> {user.phoneNumber}</p>
                        <p className="mb-2"><span className="font-semibold">Social Profiles:</span> {user.socialProfiles.join(', ')}</p>
                        <p className="mb-2"><span className="font-semibold">Password Last Changed:</span> {user.passwordLastChanged}</p>
                        <p className="mb-2"><span className="font-semibold">Custom Fields:</span> {JSON.stringify(user.customFields)}</p>
                    </div>
                ) : (
                    <p>You Are Not Logged in !!!</p>
                )}


                {loading ? (
                    <p>Loading user data...</p>
                ) : user ? (
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg mx-auto p-8 rounded-lg max-w-lg">
                        <h1 className="flex flex-row mb-4 font-bold text-3xl">
                            <img src={`${user.profilePicture}`} alt="pfp" width={200} className='p-3' />
                            <div>
                                Welcome,
                                <br />
                                {user.username}
                            </div>
                        </h1>
                        <label htmlFor="username" className="block mb-2 font-semibold">Username:</label>
                        <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="border-gray-300 mb-2 p-2 border rounded-md" />

                        <label htmlFor="email" className="block mb-2 font-semibold">Email:</label>
                        <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} className="border-gray-300 mb-2 p-2 border rounded-md" />

                        <label htmlFor="firstname" className="block mb-2 font-semibold">First Name:</label>
                        <input type="text" name="firstname" id="firstname" value={formData.firstname} onChange={handleChange} className="border-gray-300 mb-2 p-2 border rounded-md" />

                        <label htmlFor="lastname" className="block mb-2 font-semibold">Last Name:</label>
                        <input type="text" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange} className="border-gray-300 mb-2 p-2 border rounded-md" />

                        <label htmlFor="role" className="block mb-2 font-semibold">Role:</label>
                        <input type="text" name="role" id="role" value={formData.role} onChange={handleChange} className="border-gray-300 mb-2 p-2 border rounded-md" />

                        <label htmlFor="isSubscribed" className="block mb-2 font-semibold">Is Subscribed:</label>
                        <input type="checkbox" name="isSubscribed" id="isSubscribed" checked={formData.isSubscribed} onChange={(e) => setFormData({ ...formData, isSubscribed: e.target.checked })} className="mr-2 mb-2" />

                        <label htmlFor="isTwoFactorEnabled" className="block mb-2 font-semibold">Is Two Factor Enabled:</label>
                        <input type="checkbox" name="isTwoFactorEnabled" id="isTwoFactorEnabled" checked={formData.isTwoFactorEnabled} onChange={(e) => setFormData({ ...formData, isTwoFactorEnabled: e.target.checked })} className="mr-2 mb-2" />

                        <label htmlFor="phoneNumber" className="block mb-2 font-semibold">Phone Number:</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="border-gray-300 mb-2 p-2 border rounded-md" />

                        <label htmlFor="profilePicture" className="block mb-2 font-semibold">Profile Picture:</label>
                        <input type="file" accept="image/*" name="profilePicture" id="profilePicture" onChange={handleFileChange} className="border-gray-300 mb-2 p-2 border rounded-md" />

                        <h3><b>OR</b></h3>

                        <label htmlFor="profilePicture" className="block mb-2 font-semibold">Profile Picture (Link):</label>
                        <input type="text" name="profilePicture" id="profilePicture" value={formData.profilePicture} onChange={handleChange} className="border-gray-300 mb-2 p-2 border rounded-md" />

                        <br />
                        <button type="submit" className="bg-blue-500 px-4 py-2 rounded-md text-white">Save Changes</button>
                    </form>
                ) : (
                    <p>You Are Not Logged in !!!</p>
                )}
            </div>
        </>
    );
}

export default Profile;