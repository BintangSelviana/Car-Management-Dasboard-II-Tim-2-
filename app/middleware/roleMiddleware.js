const jwt = require("jsonwebtoken");
const cekSuperAdmin = (req,res,next) => {
    try{
        const token = req.cookies.jwt
        //chek keberadaan token
        if (token) {
            jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "Rahasia",(err,decodedToken)=>{
                if (err) {
                    console.log(err.message)
                    res.redirect('/api/v1/formuser')
                } else {
                    const role = decodedToken.level
                    if(role == "super_admin"){
                        next()
                    } else if(role == "admin"){
                        res.redirect("/cardashboard")
                    }else {
                      res.redirect("/")
                    }
                }
            })
        } 
        else {
            res.redirect('/api/v1/formuser')
        }
    }
    catch(err) {
        res.status(401).redirect("/")
      }
    

}
const cekAdmin = (req,res,next) => {
    try{
        const token = req.cookies.jwt
        //chek keberadaan token
        if (token) {
            jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "Rahasia",(err,decodedToken)=>{
                if (err) {
                    console.log(err.message)
                    res.redirect('/api/v1/formuser')
                } else {
                    const role = decodedToken.level
                    if(role == "super_admin"){
                        next()
                    } else if(role == "admin"){
                        next()
                    }else {
                      res.redirect("/")
                    }
                }
            })
        } 
        else {
            res.redirect('/api/v1/formuser')
        }
    }
    catch(err) {
        res.status(401).redirect("/")
      }
    

}
module.exports = {
    cekSuperAdmin,cekAdmin
}