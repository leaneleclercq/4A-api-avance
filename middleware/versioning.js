// je crée la function apiVersioning
const getAskedVersion = require("../lib/versioning.js");

module.exports = function apiVersioning(versions) {
  return function (req, res, next) {
    const apiVersion = getAskedVersion(req); // récupère la version demandée par le client
    const versionController = versions[apiVersion]; // récupère la fonction associée à cette version
    if (versionController === undefined) {
      versions.default(req, res, next);
    } else versionController(req, res, next); // appelle la fonction associée à cette version
    /**
     * versions = {
     *   v1: functionV1,
     *    v2: functionV2,
     *    v3: functionV3
     * }
     * apiVersion = "v1"
     */
  };
};
