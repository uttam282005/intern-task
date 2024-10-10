const jwt = require("jsonwebtoken");
const jwtPassword = "secret";

async function userMiddleware(req, res, next) {
  // Use lowercase for headers and handle Bearer token
  const authHeader = req.headers['authorization']; // Use 'authorization' in lowercase

  if (!authHeader) {
    return res.status(401).send("Authorization token missing");
  }

  // Check if token starts with 'Bearer ' and extract the token part
  const token = authHeader.split(' ')[1]; // 'Bearer <token>'

  if (!token) {
    return res.status(401).send("Token missing or malformed");
  }

  try {
    // Verify the token
    const status = await jwt.verify(token, jwtPassword);
    req.user = status; // Optionally, attach decoded token data to req object
  } catch (err) {
    return res.status(401).send("Invalid or expired token");
  }

  // Call the next middleware
  next();
}

module.exports = userMiddleware;


module.exports = userMiddleware;
