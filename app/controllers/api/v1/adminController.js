const adminService = require("../../../services/adminService");
const bcrypt = require("bcryptjs");

const makePasswordAdmin = (pw) => {
  return new Promise(async (rs) => {
    let salt, hash;
    salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(pw, salt);
    return rs(hash);
  });
};

module.exports = {
  async registerAdmin(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = await makePasswordAdmin(req.body.password);
    const level = req.body.level;

    adminService.createAdmin({ username, email, password, level })

    res.redirect("/superadmindashboard");
  },

  listAdmin(req,res) {
    adminService.listAdmin()
    .then(({data_admin}) => {
          res.render("superadmindashboard",{
              data_admin,
          })
      })
  }
};
