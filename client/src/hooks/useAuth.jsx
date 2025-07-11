import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// import { useEffect } from 'react';

export const useAuth = () => {
    const [cookies] = useCookies(['access_token']);
    const navigate = useNavigate();

    if (!cookies.access_token) {
        navigate('/login');
        console.log(cookies)
    }

    return cookies.access_token ? true : true;
};


// export const useRedirectIfLoggedIn = () => {
//     const [cookies] = useCookies(['access_token']);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (cookies.access_token) {
//             navigate('/');
//         }
//     }, [cookies.access_token, navigate]);
// };
