'use client';
import { useAuth0 } from '@auth0/auth0-react';

const { getAccessTokenSilently } = useAuth0();

const fetchProtectedData = async () => {
    const token = await getAccessTokenSilently();
    const response = await fetch('http://localhost:5000/api/origenes', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    console.log(data);
};
