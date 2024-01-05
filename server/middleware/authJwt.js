const { expressjwt } = require("express-jwt");

const authJwt = () => {
  const secret = process.env.SECRET_KEY;
  return expressjwt({
    secret: secret,
    algorithms: ["HS256"],
    isRevoked: async function isRevoked(req, token) {
      if (!token.payload.isAdmin) {
        return true;
      }
      return false;
    },
  }).unless({
    path: [
      "/api/v1/users/auth/register",
      "/api/v1/users/auth/login",
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/category(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/verify(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
    ],
  });
};

module.exports = authJwt;
