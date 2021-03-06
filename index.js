const Speakeasy = require('speakeasy');
const QRCode = require('qrcode');

/**
 * Generates a random secret with the set A-Z a-z 0-9 and symbols, of any length
 * (default 10). Returns the secret key in base32 format
 *
 * @param {Object} data
 * @param {Number} [options.length=20] Length of the secret
 * @param {String} [options.name] The name to use with Google Authenticator.
 * @return {secret, qrCode} The generated secret key and qrCode
 */
exports.generateQrCode = async (data) => {
  if (!data || !data.name) console.log('multi-factor-authetication:- You should probably provide name of the user to reduce confusion');
  const options = {
    length: data && data.length ? data.length : 20,
    name: data && data.name ? data.name : '2FA Secret key'
  };
  const secret = Speakeasy.generateSecret(options);
  const qrCode = await QRCode.toDataURL(secret.otpauth_url);
  return {
    secret: secret.base32,
    qrCode
  };
};

/**
 * verify totp generated by any authe app for ex. google autheticator, Authy , gauth, microsoft autheticator
 * this function will verify and retun true or false as result
 *
 * @param {String} [secret] base32 secret with which token has to be varified
 * @param {Number} [token] six digit number to validate with above provied secret
 * @return {boolean} is token valid or not
 */
exports.varifyTotp = (secret, token) => {
  if (secret === null || typeof secret === 'undefined') throw new Error('multi-factor-Authentication-ERROR: verifyTotp - Missing secret');
  if (token === null || typeof token === 'undefined') throw new Error('multi-factor-Authentication-ERROR: verifyTotp - Missing token');
  return Speakeasy.totp.verify({ secret, encoding: 'base32', token });
};
