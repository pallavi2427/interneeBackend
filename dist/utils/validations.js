"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validate = (method) => {
    switch (method) {
        case "login": {
            return [
                (0, express_validator_1.check)("email")
                    .not()
                    .isEmpty()
                    .withMessage("The email field is required."),
                (0, express_validator_1.check)("password")
                    .not()
                    .isEmpty()
                    .withMessage("The password field is required."),
            ];
        }
        case "register": {
            return [
                (0, express_validator_1.check)("email").not().isEmpty().withMessage("Email field is required"),
                (0, express_validator_1.check)("email").isEmail().withMessage("Email is invalid format"),
                (0, express_validator_1.check)("password")
                    .not()
                    .isEmpty()
                    .withMessage("The password field is required.")
                    .isLength({ min: 8 })
                    .withMessage("Password must be at least 8 characters long")
                    .matches(/\d/)
                    .withMessage("Password must contain at least one numeric digit")
                    .matches(/[a-z]/)
                    .withMessage("Password must contain at least one lowercase letter")
                    .matches(/[A-Z]/)
                    .withMessage("Password must contain at least one uppercase letter")
                    .matches(/[!@#$%^&*(),.?":{}|<>]/)
                    .withMessage("Password must contain at least one special character"),
                (0, express_validator_1.check)("first_name")
                    .not()
                    .isEmpty()
                    .withMessage("The first_name field is required."),
                (0, express_validator_1.check)("contact_number")
                    .not()
                    .isEmpty()
                    .withMessage("The contact_number field is required"),
                (0, express_validator_1.check)("company_name")
                    .not()
                    .isEmpty()
                    .withMessage("The company_name field is required"),
                (0, express_validator_1.check)("industry")
                    .not()
                    .isEmpty()
                    .withMessage("The industry field is required"),
                (0, express_validator_1.check)("designation")
                    .not()
                    .isEmpty()
                    .withMessage("The designation field is required"),
                (0, express_validator_1.check)("number_of_employees")
                    .not()
                    .isEmpty()
                    .withMessage("The number_of_employees field is required"),
                (0, express_validator_1.check)("company_address")
                    .not()
                    .isEmpty()
                    .withMessage("The company_address field is required"),
                // check('user_type').not().isEmpty().withMessage('The user_type field is required.')
            ];
        }
        case "studentregister": {
            return [
                (0, express_validator_1.check)("email").not().isEmpty().withMessage("Email field is required"),
                (0, express_validator_1.check)("email").isEmail().withMessage("Email is invalid format"),
                (0, express_validator_1.check)("password")
                    .not()
                    .isEmpty()
                    .withMessage("The password field is required.")
                    .isLength({ min: 8 })
                    .withMessage("Password must be at least 8 characters long")
                    .matches(/\d/)
                    .withMessage("Password must contain at least one numeric digit")
                    .matches(/[a-z]/)
                    .withMessage("Password must contain at least one lowercase letter")
                    .matches(/[A-Z]/)
                    .withMessage("Password must contain at least one uppercase letter")
                    .matches(/[!@#$%^&*(),.?":{}|<>]/)
                    .withMessage("Password must contain at least one special character"),
                (0, express_validator_1.check)("first_name")
                    .not()
                    .isEmpty()
                    .withMessage("The first_name field is required."),
                (0, express_validator_1.check)("last_name")
                    .not()
                    .isEmpty()
                    .withMessage("The last_name field is required."),
                (0, express_validator_1.check)("contact_number")
                    .not()
                    .isEmpty()
                    .withMessage("The contact_number field is required"),
                // check('attach_resume').not().isEmpty().withMessage('The attach_resume field is required'),
                // check('user_type').not().isEmpty().withMessage('The user_type field is required.')
            ];
        }
        case "forgot": {
            return [
                (0, express_validator_1.check)("email").not().isEmpty().withMessage("Email field is required"),
            ];
        }
        case "verifyOtp": {
            return [
                (0, express_validator_1.check)("email").not().isEmpty().withMessage("Email field is required"),
                (0, express_validator_1.check)("code").not().isEmpty().withMessage("Code field is required"),
            ];
        }
        case "changePassword": {
            return [
                (0, express_validator_1.check)("email")
                    .not()
                    .isEmpty()
                    .withMessage("The email field is required."),
                (0, express_validator_1.check)("oldpassword")
                    .not()
                    .isEmpty()
                    .withMessage("The old password field is required."),
                (0, express_validator_1.check)("newPassword")
                    .not()
                    .isEmpty()
                    .withMessage("The new password field is required.")
                    .isLength({ min: 8 })
                    .withMessage("Password must be at least 8 characters long")
                    .matches(/\d/)
                    .withMessage("Password must contain at least one numeric digit")
                    .matches(/[a-z]/)
                    .withMessage("Password must contain at least one lowercase letter")
                    .matches(/[A-Z]/)
                    .withMessage("Password must contain at least one uppercase letter")
                    .matches(/[!@#$%^&*(),.?":{}|<>]/)
                    .withMessage("Password must contain at least one special character"),
            ];
        }
        case "reset": {
            return [
                (0, express_validator_1.check)("password_token")
                    .not()
                    .isEmpty()
                    .withMessage("The code field is required."),
                (0, express_validator_1.check)("email")
                    .not()
                    .isEmpty()
                    .withMessage("The email field is required."),
                (0, express_validator_1.check)("password")
                    .not()
                    .isEmpty()
                    .withMessage("The new password field is required.")
                    .isLength({ min: 8 })
                    .withMessage("Password must be at least 8 characters long")
                    .matches(/\d/)
                    .withMessage("Password must contain at least one numeric digit")
                    .matches(/[a-z]/)
                    .withMessage("Password must contain at least one lowercase letter")
                    .matches(/[A-Z]/)
                    .withMessage("Password must contain at least one uppercase letter")
                    .matches(/[!@#$%^&*(),.?":{}|<>]/)
                    .withMessage("Password must contain at least one special character"),
            ];
        }
        case "postcode": {
            return [
                (0, express_validator_1.check)("postcode")
                    .not()
                    .isEmpty()
                    .withMessage("The postcode field is required"),
            ];
        }
        case "addproperty": {
            return [
                (0, express_validator_1.check)("property_name")
                    .not()
                    .isEmpty()
                    .withMessage("The property_name field is required"),
            ];
        }
    }
};
exports.default = validate;
//# sourceMappingURL=validations.js.map