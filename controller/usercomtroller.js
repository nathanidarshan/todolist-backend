var task = require('../model/taskmodel');
var employee = require('../model/empmodel');
const bcrypt = require('bcrypt');
const storage = require('node-persist');
storage.init( /* options ... */)

// task ========================================================================
exports.addtask = async (req, res) => {
    try {
        var data = await task.create(req.body);
        res.status(200).json({
            status: "deta insert",
            data: data
        });
    }
    catch (error) {
        res.status(200).json({
            error
        });
    }
};

exports.viewtask = async (req, res) => {
    try {
        var data = await task.find();

        res.status(200).json({
            status: 200,
            data: data
        });

    } catch (error) {
        res.status(200).json({
            error
        });
    }
};

exports.taskupdate = async (req, res) => {
    try {
        var id = req.params.id;
        var data = await task.findByIdAndUpdate(id, req.body);

        res.status(200).json({
            status: "task update",
            data: data
        });

    } catch (error) {
        res.status(200).json({
            error
        });
    }
};

exports.taskdelete = async (req, res) => {
    try {
        var id = req.params.id;

        var data = await task.findByIdAndDelete(id);
        res.status(200).json({
            status: "task delete",
            data: data
        });
    } catch (error) {
        res.status(200).json({
            error
        });
    }
}

// employee ====================================================================
exports.addemployee = async (req, res) => {
    try {
        var data = await employee.create(req.body);

        var b_pass = await bcrypt.hash(req.body.password, 10);
        req.body.password = b_pass;

        res.status(200).json({
            status: "data insert",
            data: data
        });
    }
    catch {
        res.status(200).json({
            error
        });
    }
};

exports.viewemployee = async (req, res) => {
    try {
        var data = await employee.find().populate("task_id");
        res.status(200).json({
            status: 200,
            data: data
        });
    } catch (error) {

        res.status(200).json({
            error
        });
    }
};

exports.employeeupdate = async (req, res) => {
    try {

        var id = req.params.id;
        var data = await employee.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: "employee update",
            data: data
        });

    } catch (error) {
        res.status(200).json({
            error
        });
    }
};

exports.employeedelete = async (req, res) => {
    try {
        var id = req.params.id;
        var data = await employee.findByIdAndDelete(id);
        res.status(200).json({
            status: "employee delete",
            data: data
        });
    } catch (error) {
        res.status(200).json({
            error
        })
    }
}
// login =============================================================

exports.login = async (req, res) => {

    var empstatus = await storage.getItem("employeeinfo");

    if (empstatus == undefined) {
        var data = await employee.find({ email: req.body.email });

        if (data.length == 1) {
            bcrypt.compare(req.body.password, data[0].password, async function (error, result) {
                if (req.body.password == data[0].password) {
                    await storage.setItem("employeeinfo", data[0].id);
                    res.status(200).json({
                        status: "login",
                        employeedeteil: data[0],
                    });
                } else {
                    res.status(200).json({
                        status: "check your emial and password 1"
                    });
                }
            });
        }
        else {
            res.status(200).json({
                status: "check your emial and password 2"
            });
        }
    }
    else {
        res.status(200).json({
            status: "already login"
        })
    }
};

exports.logout = async (req, res) => {
    await storage.clear();
    res.status(200).json({
        status: "logout"
    })
}