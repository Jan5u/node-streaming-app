import dotenv from "dotenv";
dotenv.config();

const user = {
  username: process.env.BASIC_USERNAME || "admin",
  password: process.env.BASIC_PASSWORD || "admin",
};

/**
 * Authenticate user with basic auth
 * @param req webserver request object
 * @param res webserver response object
 */
export function authenticateUser(req, res) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.writeHead(401, {
      "www-authenticate": 'Basic realm="Secure Area"',
    });
    res.end("Access denied");
    return;
  }

  const [username, password] = Buffer.from(authorization.split(" ")[1], "base64").toString().split(":");
  if (username !== user.username || password !== user.password) {
    res.writeHead(401, {
      "www-authenticate": 'Basic realm="Secure Area"',
    });
    res.end("Access denied");
    return;
  }
}
