
// const userMetadata = await getUserMetadata();
useEffect(() => {
    const getUserMetadata = async () => {
        const domain = "dev-1duhzfzedlymqcp6.eu.auth0.com";

        try {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                },
            });

            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

            const metadataResponse = await fetch(userDetailsByIdUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const { user_metadata } = await metadataResponse.json();

            setUserMetadata(user_metadata);
        } catch (e) {
            console.log(e.message);
        }
    };

    getUserMetadata();
}, [getAccessTokenSilently, user?.sub]);