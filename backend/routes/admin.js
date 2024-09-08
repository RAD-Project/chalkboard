const router = require("express").Router();
const { Admin } = require("../models/Scheam.js");
const bcrypt = require("bcrypt");

// Add Admin
router.route("/add").post(async (req, res) => {
    const { adminId, adminName, adminAge, adminGender, adminPassword } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ adminName });

        if (existingAdmin) {
            return res.status(400).send({ status: "Error", message: "Admin already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        const newAdmin = new Admin({
            adminId,
            adminName,
            adminAge,
            adminGender,
            adminPassword: hashedPassword, // Store hashed password
        });

        await newAdmin.save();
        res.json("Admin Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding admin", error: err.message });
    }
});

// View admins
router.route("/").get(async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching admins", error: err.message });
    }
});

// Update admin
router.route("/update").put(async (req, res) => {
    const { adminId, newadminName, newadminAge, newadminPassword } = req.body;

    try {
        let hashedPassword = newadminPassword;
        // Hash the new password
        if(newadminPassword){
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(newadminPassword, salt);
        }
        const updatedAdmin = await Admin.findOneAndUpdate(
            { adminId },
            { adminName: newadminName, adminAge: newadminAge, adminPassword: hashedPassword },
            { new: true }
        );

        if (updatedAdmin) {
            res.status(200).send({ status: "Update successful", user: updatedAdmin });
        } else {
            res.status(404).send({ status: "Admin not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating admin", error: err.message });
    }
});

// Delete Admin
router.route("/delete").delete(async (req, res) => {
    const { adminId } = req.body;

    try {
        await Admin.findOneAndDelete({ adminId });
        res.status(200).send({ status: "User deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error deleting admin", error: err.message });
    }
});


module.exports = router;