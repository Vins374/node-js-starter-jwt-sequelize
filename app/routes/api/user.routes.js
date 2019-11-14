const authMiddleware = require("../../middleware/auth.middleware.js");
const user = require('../../controllers/user.controller.js');

module.exports = (app) => {
    
    

    // V1 Apis
    app.post('/api/user/create', user.create);
    app.post('/api/user/login', user.login);

    app.post('/api/user', authMiddleware.validate, user.get);
}
