const jwt = require("jsonwebtoken")

module.exports = function(right){
    return function(req,res,next){
        if (req.method === "OPTIONS"){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message:'пользователь не аввторизован'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (!decoded.rights.some((e)=>e === right || e === 'all')){
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded
            next()
        } catch (error) {
            res.status(401).json({message:'пользователь не аввторизован'})
        }
    }
}



