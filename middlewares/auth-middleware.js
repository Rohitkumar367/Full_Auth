
import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'

let checkUserAuth = async (req, res, next) => {
    let token;
    const {authorization} = req.headers

    if(authorization && authorization.startswith('Bearer'))
    {
        try {
            // get token from header
            token = authorization.split(' ')[1];

            // verify Token
            const {userId} = jwt.verify(token, process.env.JWT_SECRET_KEY)

            // get user from token
            req.user = await UserModel.findById(userId).select(-password)

            next()

        } catch (error) {
            res.status(401).send({"status": "failed", "message": "Unauthorized User"})
        }
    }
    else{
        res.status(401).send({"status": "failed", "message": "Unauthorized User, No Token"})
    }

}

export default checkUserAuth;