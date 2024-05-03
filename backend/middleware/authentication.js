import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()


const AuthentiCation = {

    generateToken: async (payload, exiresIn = '1d') => {
        try {
            console.log(payload)
            const tokenPayload = {user_id:payload.toString()}
            const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, exiresIn)
            return token
        } catch (error) {
            console.error(error.message);

        }
    },

    verifyToken: async (token) => {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            return decoded

        } catch (error) {
            return 'some error in authentication'

        }
    }
}
export default AuthentiCation
