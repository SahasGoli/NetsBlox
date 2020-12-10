const fs = require('fs');
const path = require('path');
const AutograderCode = fs.readFileSync(path.join(__dirname, 'template.ejs'), 'utf8');
const getDatabase = require('./storage');

module.exports = [
    {  // fetch autograder
        URL: 'autograders/:name.js',
        Method: 'get',
        Handler: async function(req, res) {
            const {name} = req.params;
            const storage = getDatabase();
            const autograder = await storage.findOne({name});
            if (!autograder) {
                return res.sendStatus(404);
            }

            const code = AutograderCode.replace(
                'AUTOGRADER_CONFIG',
                JSON.stringify(autograder.config)
            );
            return res.send(code);
        }
    },
];