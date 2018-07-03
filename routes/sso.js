const saml = require('samlify');
const express = require('express');
var fs = require('fs');

const router = express.Router();
const ServiceProvider = saml.ServiceProvider;
const IdentityProvider = saml.IdentityProvider;

const sp = ServiceProvider({
    metadata: fs.readFileSync(__dirname+'/sp_metadata.xml')
});
const idp = IdentityProvider({
    metadata: fs.readFileSync(__dirname+'/idp_metadata.xml')
});

router.get('/metadata', (req, res) => res.header('Content-Type', 'text/xml').send(sp.getMetadata()));

router.get('/spinitsso-redirect', (req, res) => {
    const { id, context } = sp.createLoginRequest(idp, 'redirect');
    return res.redirect(context);
});

router.post('/acs', (req, res) => {
    sp.parseLoginResponse(idp, 'post', req)
    .then(parseResult => {
        console.log(parseResult);
    })
    .catch(console.error);
    res.redirect('/sso/acs');
});

router.get('/acs', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;
