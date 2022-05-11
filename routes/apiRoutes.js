const app = require("express");
const apiController = require("../controllers/apiControllers");

const router = app.Router();

router.post('/addrole',apiController.role);

router.get('/showrole',apiController.showroles);

router.post('/adduser',apiController.adduser);

router.get('/showusers',apiController.showausers);

router.post('/addcourse', apiController.addcourse);

router.get('/showcourses',apiController.showcourses);

router.post('/coursestaken',apiController.coursestaken);

router.get('/showenroleduser',apiController.showenroleduser);

router.get('/enroleduser/:id',apiController.enroleduser);

router.post('/updatestatus',apiController.updatestatus);

module.exports = router;