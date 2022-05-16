const adminRepository = require("../repositories/adminRepository")

module.exports = {
    async createAdmin(requestBody) {
        return adminRepository.createAdmin(requestBody);
    },

    async updateAdmin(id, requestBody) {
        return adminRepository.updateAdmin(id, requestBody);
    },

    async deleteAdmin(id) {
        return adminRepository.delete(id);
    },

    async getAdmin(id) {
        return adminRepository.findAdmin(id);
    },

    async listAdmin() {
        try {
            const admin = await adminRepository.findAllAdmin();

            return {
                data_admin: admin,
            };
        } catch (err) {
            throw err;
        }
    },
};
