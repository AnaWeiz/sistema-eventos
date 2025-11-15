const jwt = require('jsonwebtoken');
const blacklistService = require('../services/blackListService.js');

function verifyJWT(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Token não informado." });

  token = req.headers["authorization"].replace("Bearer ", "").trim();

  if (blacklistService.isBlacklisted(token)) {
    return res.status(403).json({ message: "Token inválido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(403).json({ message: "Token inválido." });

    res.locals.token = decoded;
    return next();
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
}

module.exports = { verifyJWT };