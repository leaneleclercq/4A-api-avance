const i18next = require("i18next");
const initTranslations = require("../lib/i18next");

module.exports = (req, res, next) => {
  const traductionFunction = initTranslations(req);
  res.trad = traductionFunction;
  res.setHeader("Content-Language", req.language);
  next();
};
