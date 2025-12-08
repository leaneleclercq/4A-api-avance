const Papa = require("papaparse");  
const xml2js = require("xml2js");

module.exports = (req, res, next) => {
    res.render = function (data) {
        res.format({
            'text/csv' () {
                const csv = Papa.unparse(data.map((data) => data.dataValues))
                res.setHeader('Content-type', 'text/csv');
                res.send(csv);
            },
            'text/xml' () {
                const name = (Array.isArray(data) ? data[0] : data).constructor.name.toLowerCase();
                const builder = new xml2js.Builder();
                const xml = builder.buildObject({[name + "s"]:data.map((data) => ({[name]:data.dataValues}))});
                res.setHeader('Content-type', 'text/xml');
                res.send(xml);
            },
            default() {
                res.json(data);
            }
        })
    }
    ;
    next();
};