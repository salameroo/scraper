import { useAuth0 } from '@auth0/auth0-react';

const { getAccessTokenSilently } = useAuth0();

const fetchOrigenes = async () => {
    try {
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_API_AUDIENCE
        });

        const response = await fetch('http://localhost:5000/api/origenes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
