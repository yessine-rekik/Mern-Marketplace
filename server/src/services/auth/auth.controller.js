const User = require('../user/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config');

const accessTokenSecret = config.jwt_access_secret;
const refreshTokenScret = config.jwt_refresh_secret;

const genereateAccessToken = (id) => {
  return jwt.sign({ id }, accessTokenSecret, { expiresIn: '1m' });
};

const genereateRefreshToken = (id) => {
  return jwt.sign({ id }, refreshTokenScret, { expiresIn: '7d' });
};

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(401).send({ username: true });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(401).send({ password: true });

    // generate new pair of tokens
    const accessToken = genereateAccessToken(user._id);
    const refreshToken = genereateRefreshToken(user._id);

    // Remove expired refresh tokens from DB and add the new one
    const refreshTokensList = user.refreshTokens.filter((token) =>
      jwt.verify(token, refreshTokenScret, (error) => {
        if (error) return false;
        return true;
      })
    );
    refreshTokensList.push(refreshToken);

    await User.findByIdAndUpdate(user._id, {
      refreshTokens: refreshTokensList,
    });

    res
      .cookie('refresh-token', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .send({
        accessToken,
        _id: user._id,
        username: user.username,
      });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

// generate new pair of tokens and delete the old refresh token from DB
// refresh tokens are limited to one time usage
async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies['refresh-token'];
    if (!refreshToken) return res.status(401).send('No refresh token provided');

    jwt.verify(refreshToken, refreshTokenScret, async (err, decoded) => {
      if (err) return res.status(403).send('Invalid token');

      // generate new access token and refresh tkoen and update DB
      const newRefreshToken = genereateRefreshToken(decoded.id);
      const user = await User.findOneAndUpdate(
        {
          _id: decoded.id,
          refreshTokens: refreshToken,
        },
        {
          $set: { 'refreshTokens.$': newRefreshToken },
        },
        { new: true }
      );

      // if no user if found then the refresh token must be revoked(deleted from DB)
      if (!user) return res.status(401).send('Invalid Token');

      console.log(user);
      const accessToken = genereateAccessToken(decoded.id);
      res
        .cookie('refresh-token', newRefreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .send({
          _id: user._id,
          username: user.username,
          accessToken,
          // newRefreshToken
        });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function logout(req, res) {
  const cookies = req.cookies;
  if (!cookies['refresh-token']) return res.sendStatus(204);

  try {
    const refreshToken = req.cookies['refresh-token'];
    if (!refreshToken) return res.sendStatus(200);

    // Remove the refresh token from the DB
    jwt.verify(refreshToken, refreshTokenScret, async (err, decoded) => {
      if (err) return res.sendStatus(200);

      await User.findOneAndUpdate(
        {
          _id: decoded.id,
        },
        {
          $pull: { refreshTokens: refreshToken },
        }
      );
    });

    res.clearCookie('refresh-token', {
      httpOnly: true,
      // secure:true;
    });

    res.send('Cookie cleared');
  } catch (err) {
    console.log(err);
  }
}

async function register(req, res) {
  try {
    let user = req.body;
    const existingUser = await User.findOne({ username: user.username });

    if (existingUser) return res.status(409).send('User already exists');

    user.password = await bcrypt.hash(user.password, 10);

    // generate a pair of tokens
    const accessToken = genereateAccessToken(user._id);
    const refreshToken = genereateRefreshToken(user._id);

    user = {
      ...user,
      refreshTokens: [refreshToken],
    };
    const createdUser = await User.create(user);

    res
      .cookie('refresh-token', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .send({
        accessToken,
        _id: createdUser._id,
        username: createdUser.username,
      });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

module.exports = {
  login,
  refreshToken,
  logout,
  register,
};
