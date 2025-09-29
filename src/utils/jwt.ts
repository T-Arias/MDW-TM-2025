import jwt, { SignOptions } from "jsonwebtoken";


export function signToken(
  payload: object,
  // tomamos el tipo exacto que acepta jsonwebtoken@9
  expiresIn?: SignOptions["expiresIn"]
): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET no está definido en .env");

  // lee del .env si no vino por parámetro
  let exp: SignOptions["expiresIn"] =
    expiresIn ??
    // si viene un número en string, lo convertimos a number; si no, lo usamos como "1d"|"2h"|etc.
    (process.env.JWT_EXPIRES_IN
      ? (/^\d+$/.test(process.env.JWT_EXPIRES_IN)
          ? Number(process.env.JWT_EXPIRES_IN)
          : (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]))
      : "1d");

  const options: SignOptions = { expiresIn: exp };
  return jwt.sign(payload, secret, options);
}
