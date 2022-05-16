const res = require("express/lib/response")

module.exports ={
    home(req,res){
        res.render("home")
    },
    availcar(req,res){
        res.render("cartersedia")
    },
    superadmin(req,res){
        res.render("superadmindashboard")
    },

    tambahadmin(req,res){
        res.render("tambahadmin")
    },

    cardashboard(req,res){
        res.render("cardashboard")
    }
}