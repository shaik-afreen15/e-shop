import User from "../models/User.js";

/* =========================
   GET PROFILE
========================= */
export const getProfile = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Profile updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
};
