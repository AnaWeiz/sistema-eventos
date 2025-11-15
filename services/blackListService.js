const blacklist = {};

const addToken = (token, expirationTimeSeconds) => {
  blacklist[token] = true;

  setTimeout(() => {
    delete blacklist[token];
  }, expirationTimeSeconds * 1000);
};

const isBlacklisted = (token) => {
  return !!blacklist[token];
};

const getBlacklistSize = () => {
  return Object.keys(blacklist).length;
};

module.exports = {
  addToken,
  isBlacklisted,
  getBlacklistSize
};