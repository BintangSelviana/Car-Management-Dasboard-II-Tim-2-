const express = require("express");
const controllers = require("../app/controllers");
const {requireAuth, checkUser} = require ("../app/middleware/authMiddleware");
const { cekSuperAdmin,cekAdmin } = require("../app/middleware/roleMiddleware");
const apiRouter = express.Router();
const yaml = require("yamljs")
const swaggerUI = require("swagger-ui-express")
const doc = yaml.load("./openapi.yaml")

/**
 * TODO: Implement your own API
 *       implementations
 */
apiRouter.get('*',checkUser)
apiRouter.get("/",controllers.api.v1.homeController.home)
apiRouter.get("/cartersedia",requireAuth,controllers.api.v1.homeController.availcar)
apiRouter.get("/superadmindashboard",cekSuperAdmin,controllers.api.v1.adminController.listAdmin)
apiRouter.get("/superadmindashboard/tambahadmin",cekSuperAdmin,controllers.api.v1.homeController.tambahadmin)
apiRouter.post("/tambahadmin", controllers.api.v1.adminController.registerAdmin)
apiRouter.get("/cardashboard",cekAdmin,controllers.api.v1.homeController.cardashboard)

apiRouter.get("/api/v1/posts",controllers.api.v1.postController.list);
apiRouter.post("/api/v1/posts", controllers.api.v1.postController.create);
apiRouter.put("/api/v1/posts/:id", controllers.api.v1.postController.update);
apiRouter.get("/api/v1/posts/:id", controllers.api.v1.postController.show);
apiRouter.delete(
  "/api/v1/posts/:id",
  controllers.api.v1.postController.destroy
);

apiRouter.post("/api/v1/whoami", 
controllers.api.v1.authController.authorize,
controllers.api.v1.authController.whoAmI);
apiRouter.post("/api/v1/login", 
controllers.api.v1.authController.login);
apiRouter.get("/api/v1/formuser", 
controllers.api.v1.authController.formuser);
apiRouter.post("/api/v1/register", 
controllers.api.v1.authController.register);
apiRouter.get("/api/v1/logout", 
controllers.api.v1.authController.logout);

apiRouter.get("/api/v1/docs", controllers.api.v1.docsController.getSwagger)
apiRouter.use("/api", swaggerUI.serve)
apiRouter.get("/api", swaggerUI.setup(doc))

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
