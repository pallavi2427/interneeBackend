import { check } from "express-validator";

const validate = (method: string) => {
  switch (method) {
    case "login": {
      return [
        check("email")
          .not()
          .isEmpty()
          .withMessage("The email field is required."),
        check("password")
          .not()
          .isEmpty()
          .withMessage("The password field is required."),
      ];
    }
    case "register": {
      return [
        check("email").not().isEmpty().withMessage("Email field is required"),
        check("email").isEmail().withMessage("Email is invalid format"),
        check("password")
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
        check("first_name")
          .not()
          .isEmpty()
          .withMessage("The first_name field is required."),
        check("contact_number")
          .not()
          .isEmpty()
          .withMessage("The contact_number field is required"),
        check("company_name")
          .not()
          .isEmpty()
          .withMessage("The company_name field is required"),
        check("industry")
          .not()
          .isEmpty()
          .withMessage("The industry field is required"),
        check("designation")
          .not()
          .isEmpty()
          .withMessage("The designation field is required"),
        check("number_of_employees")
          .not()
          .isEmpty()
          .withMessage("The number_of_employees field is required"),
        check("company_address")
          .not()
          .isEmpty()
          .withMessage("The company_address field is required"),

        // check('user_type').not().isEmpty().withMessage('The user_type field is required.')
      ];
    }
    case "studentregister": {
      return [
        check("email").not().isEmpty().withMessage("Email field is required"),
        check("email").isEmail().withMessage("Email is invalid format"),
        check("password")
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
        check("first_name")
          .not()
          .isEmpty()
          .withMessage("The first_name field is required."),
        check("last_name")
          .not()
          .isEmpty()
          .withMessage("The last_name field is required."),
        check("contact_number")
          .not()
          .isEmpty()
          .withMessage("The contact_number field is required"),
        // check('attach_resume').not().isEmpty().withMessage('The attach_resume field is required'),

        // check('user_type').not().isEmpty().withMessage('The user_type field is required.')
      ];
    }
    case "forgot": {
      return [
        check("email").not().isEmpty().withMessage("Email field is required"),
      ];
    }
    case "verifyOtp": {
      return [
        check("email").not().isEmpty().withMessage("Email field is required"),
        check("code").not().isEmpty().withMessage("Code field is required"),
      ];
    }
    case "changePassword": {
      return [
        check("email")
          .not()
          .isEmpty()
          .withMessage("The email field is required."),
        check("oldpassword")
          .not()
          .isEmpty()
          .withMessage("The old password field is required."),
        check("newPassword")
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
        check("password_token")
          .not()
          .isEmpty()
          .withMessage("The code field is required."),
        check("email")
          .not()
          .isEmpty()
          .withMessage("The email field is required."),
        check("password")
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
        check("postcode")
          .not()
          .isEmpty()
          .withMessage("The postcode field is required"),
      ];
    }
    case "addproperty": {
      return [
        check("property_name")
          .not()
          .isEmpty()
          .withMessage("The property_name field is required"),
      ];
    }
  }
};

export default validate;
