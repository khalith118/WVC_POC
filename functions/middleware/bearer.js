const asyncHandler = require('express-async-handler');
const axios = require('axios');
const CONFIG = {
    TENANT_ID: '',
    CLIENT_ID: '',
    CLIENT_SECRET: '',
    RESOURCE: '',
}
const { TENANT_ID, CLIENT_ID, CLIENT_SECRET, RESOURCE } = process.env;
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

exports.GetBearer = asyncHandler(async (req, res, next) => {
    const data = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CONFIG.CLIENT_ID,
        client_secret: CONFIG.CLIENT_SECRET,
        resource: CONFIG.RESOURCE,
    });
    try {
        const bearer = await axios.post(`https://login.microsoftonline.com/${CONFIG.TENANT_ID}/oauth2/token`, data.toString(), { headers });
        req.bearer_token = bearer?.data?.access_token ?? '';
        next();
    } catch (error) {
        console.error('Error response:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || error.message);
    }
});
