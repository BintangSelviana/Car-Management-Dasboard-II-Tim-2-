/**
 * @file contains authentication request handler and its business logic
 * @author Fikri Rahmat Nurhidayat
 */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../../../models");
const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(isPasswordCorrect);
    });
  });
}
function createToken(id) {
  return jwt.sign(id, process.env.JWT_SIGNATURE_KEY || "Rahasia");
}


module.exports = {
  formuser(req,res){
    res.render("formuser")
  },
  async register(req, res) {
    console.log(req.body.password);
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.level);

    const username = req.body.username;
    const email = req.body.email;
    const password = await encryptPassword(req.body.password);
    const level = req.body.level;
    const user = await User.create({ username,email, password, level });
    // res.status(201).json({
    //   id: user.id,
    //   username : user.username,
    //   email: user.email,
    //   level : user.level,
    //   createdAt: user.createdAt,
    //   updatedAt: user.updatedAt,
    // });
    res.render("formuser");
  },

  async login(req, res) {
    const email = req.body.email.toLowerCase(); // Biar case insensitive
    const password = req.body.password;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "Email tidak ditemukan" });
      return;
    }

    const isPasswordCorrect = await checkPassword(
      user.password,
      password
    );
    const token = createToken({
      id: user.id,
      email: user.email,
      level: user.level,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
    


    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Password salah!" });
      return;
    }
    res.cookie('jwt',token, {httpOnly : true})
    // res.status(201).json({
    //   id: user.id,
    //   email: user.email,
    //   token: token, // Kita bakal ngomongin ini lagi nanti.
    //   createdAt: user.createdAt,
    //   updatedAt: user.updatedAt,
    // });
    if (token) {
      jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "Rahasia",(err,decodedToken)=>{
          if (err) {
              console.log(err.message)
              res.redirect('/api/v1/formuser')
          } else {
              const role = decodedToken.level
              if(role == "super_admin"){
                res.redirect("/superadmindashboard")
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

  },
  logout(req,res){
    res.cookie('jwt','',{maxAge:1})
    res.redirect("/")
  }, 
  async whoAmI(req, res) {
    res.status(200).json(req.user);
  },
  async authorize(req, res, next) {
    try{
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "Rahasia");

      // req.user = await User.findByPK(tokenPayload.id);
      
      id = tokenPayload.id
      req.user = await User.findOne({
        where : {id}
      })
      next();

    } 
    catch(err) {
      res.status(401).json({
        message: "Unauthorized"
      })
    }
  },

};
