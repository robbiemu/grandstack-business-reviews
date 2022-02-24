import * as jwt from "jsonwebtoken"
import jwks from "jwks-rsa"


export const client = jwks({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
})

const getPublicKey = (header, callback) => client.getSigningKey(
  header.kid, 
  (err, key) => {
    if(err) return console.error('error getting Public Key', err)
    const publicKey = key.publicKey || key.rsaPublicKey;
    callback(null, publicKey);
  }
)

export function verifyJwt(token, options, callback) {
  jwt.verify(token, getPublicKey, options, callback)
}
