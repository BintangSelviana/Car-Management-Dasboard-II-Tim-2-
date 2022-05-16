const { User } = require("../models")

module.exports = {
    createAdmin(createArgs){
        return User.create(createArgs)
    },
    updateAdmin(id, updateArgs) {
        return User.update(updateArgs, {
            where: {
                id,
            },
        });
    },
    deleteAdmin(id) {
        return User.destroy({where: {id}});
    },
    findAdmin(id) {
        return User.findByPk(id);
    },
    findAllAdmin() {
        return User.findAll(
            {where :{level : "admin"}}
        );
    },
}