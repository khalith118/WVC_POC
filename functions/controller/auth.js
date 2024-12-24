const asyncHandler = require('express-async-handler');
const axios = require('axios');
const { APIURL, ENV, SUBSCRIPTION_KEY } = process.env;
const API = axios.create({ baseURL: `${APIURL}${ENV}`, withCredentials: true });
const jwt = require('jsonwebtoken')
//login
exports.login = asyncHandler(async (req, res) => {
    const { email: Email, password: login_token } = req.body;
    try {
        const response = await API.post(`/identityproviderservice/v1/Loginuser`,
            { Email, login_token },
            {
                headers: {
                    Authorization: `Bearer ${req.bearer_token}`,
                    'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
                }
            });
        res.status(200).cookie('token', generateToken(response.data))
            .json({ status: true, message: 'User logged in successfully', user: response.data });

    } catch (error) {
        console.error('Error response:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || error.message);
    }
});
const generateToken = ({ email, firstname, lastname, id }) => {
    const token = jwt.sign({
        email, firstname, lastname, id
    }, 'process.env.TOKEN_KEY', { expiresIn: '30d' });
    return token
}
