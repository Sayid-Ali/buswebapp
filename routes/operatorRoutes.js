const router = require("express").Router();
const Operator = require("../models/operatorModel");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/usersModel");
//get all operators

router.get("/get-all-operators", async (req, res) => {
    try {
       // find operators from users 
        const operators = await User.find({isOperator: true});
        return res.status(200).send({
        success: true,
        message: "Operators fetched successfully",
        data: operators,
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
    }
);

//add operator route


module.exports = router;