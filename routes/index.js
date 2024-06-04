var express = require('express');
var router = express.Router();
var user = require('../controller/usercomtroller');

/* GET home page. */
// task =======================================================
router.post('/task/add',user.addtask);
router.get('/task/view',user.viewtask);
router.post('/task/update/:id',user.taskupdate);
router.get('/task/delete/:id',user.taskdelete);

// employee ====================================================

router.post('/emp/add',user.addemployee);
router.get('/emp/view',user.viewemployee);
router.post('/emp/update/:id',user.employeeupdate);
router.get('/emp/delete/:id',user.employeedelete);

// login =========================================================

router.post('/login',user.login);
router.post('/logout',user.logout);

module.exports = router;
