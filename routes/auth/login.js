
const Express = require("express");
const bcrypt = require("bcryptjs")

const router = Express.Router();
const User = require("../../models/User");


router.post("/", async (req, res) => {

    const { email, password } = req.body

    try{

    const user = await User.findOne({ email })

    if (!user) return res.status(404).json({ message: "El usuario no existe" })
    
    const  passwordDB = user.password

    if ( ! bcrypt.compareSync( password, passwordDB ) ) return res.status(401).json({message: "La contraseña no es correcta"})

    req.session.currentUser = user

    res.status(200).json({ message: "Usuario loggeado", user })

    } catch(error) {
        console.log(error)
         res.status(500).json({ message: "Hubo un problema" })
    }





})


module.exports = router