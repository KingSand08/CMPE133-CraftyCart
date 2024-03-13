import jwt from 'jsonwebtoken';

export const getDataFromToken = (request) => {

    try {
        // Retrieve the token from the cookies
        const token = request.cookies.get("token").value || '';
        console.log(token);

        // Verify and decode the token using the secret key
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        // Return the user ID from the decoded token
        return decodedToken.id;

    } catch (error) {
        console.log(error.message);
        
    }
}