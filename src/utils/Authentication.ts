import jwt, { JwtPayload } from "jsonwebtoken";

const Authentication = (req: any, res: any, next: any) => {
  const token: any = req.get("Authorization")?.split("Bearer ")[1];
  try {
    var decoded: any = jwt.verify(token, process.env.TOKEN_SECRETE as string);
    if (decoded?.email) {
      req.user = decoded;
      next();
    } else {
      res.status(401).json({
        message: "token is required",
        status: 401,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "token is required",
      status: 401,
    });
  }
};
export default Authentication;
