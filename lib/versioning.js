const packageJson = require("../package.json");
const currentFullVersion = packageJson.version;

const currentMajorVersion = currentFullVersion.split(".")[0]; // récupère la version par défault

function getAskedVersion(req) {
  // récupérer la version qui est demandée par le client, parmi toutes les versions qui existent
  const apiVersionHeader =
    req.headers["x-api-version"] ??
    req.headers["X-API-Version"] ??
    "v" + currentMajorVersion; // récupère la version dans les headers, sinon prend la version par défaut
  return apiVersionHeader;
}

module.exports = getAskedVersion;
