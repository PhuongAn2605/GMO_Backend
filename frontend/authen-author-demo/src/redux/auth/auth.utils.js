export const login = (userId, token, expirationDate) => {

    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000*60*60);

    localStorage.setItem(
        'userData',
        JSON.stringify({
            userId,
            token,
            expiration: tokenExpirationDate.toISOString()
        })
    );

    return tokenExpirationDate;
};