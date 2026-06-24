import { loginAdmin } from "../services/auth.service.js";
import { validateLogin } from "../validators/auth.validator.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    validateLogin(email, password);

    const result = await loginAdmin(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};