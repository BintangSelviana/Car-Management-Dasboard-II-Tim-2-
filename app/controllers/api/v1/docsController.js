const yaml = require("yamljs")
const doc = yaml.load("./openapi.yaml")

module.exports = {
    async getSwagger(req, res) {
        res.status(200).json(doc);
    }
}