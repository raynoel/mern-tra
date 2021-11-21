// Middleware qui alide le token afin de donner l'accès à des zones protégès
// Le token est inscrit dans les headers sous la clé "authorization"
// Pour nos besoins, le token est composé d'un obj contenant le id, un pw et la date d'expiration
// Le token est généré par /util/generateToken.js
// Le middleware est utilisé dans userRoutes.js
import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler";                     // middleware qui catch les erreurs, on peut alors omettre try-catch
import User from '../models/userModel.js'

// Obtient le token des headers et l'utilise pour obtenir les infos de l'usagé contenu dans la DB
const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization                               // Extrait Le token contenu sous la clé 'authorization'
  if (token && token.startsWith('Bearer')) {                          // Vérifie qu'on a utilisé 'Bearer'
    try {
      token = token.split(' ')[1]                                     // Extrait le token du 'Bearer asdlljf87lnf88fk..'
      const decoded = jwt.verify(token, process.env.JWT_SECRET)       // Extrait le id, pw et ext du token et verifie le pw avec celui .env
      req.user = await User.findById(decoded.id).select('-password')  // Obtient les infos de l'usagé de la DB
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export { protect }