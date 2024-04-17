import jwt from 'jsonwebtoken';


export const getDataFromToken = (request) => {

      
        if (!request.cookies.get("token")) {
            return jwt.verify(request.cookies.get("tempToken")?.value, process.env.TOKEN_SECRET).id;
        }

        // Retrieve the token from the cookies
        const token = request.cookies.get("token")?.value || '';



        // Verify and decode the token using the secret key
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        
        

        // Return the user ID from the decoded token
        return decodedToken;


}