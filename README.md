# multi-factor-authentication

Easy integration of two-factor-authetication or multi-factor-authetication can be used for google-authenticator, authy, gauth or any other authenticator which provides real time totp with/without internet connection

## Get Started

#### Generate QR code and secret
```
const MFA = require('multi-factor-authentication');

const options = {
  length: Number,//default is 20 (optional)
  name: String // name which will be displayed in autheticator app (optional)
}

MFA.generateQrCode(options);
/*
* this function will return a secret which should be stored for token validation in future
* and qrcode image url which can be used to display qrcode in browser or in any view
*/
```

#### verify Token

```
const secret = String;// provide secret key generated at the time of qr code (required)
const token = Number;//token provided by autheticator application(required)

MFA.verifyTotp( secret , token );
// this function return boolean as a result
```

### Time based OTP for email and SMS

this functionality will be published in version 3.0.0
