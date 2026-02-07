import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  // VERY IMPORTANT: allow preflight requests
  if (req.method === "OPTIONS") {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    req.userId = decoded.id || decoded._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Safe admin middleware
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
