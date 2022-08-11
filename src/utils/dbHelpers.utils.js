const pool = require("../configs/DB.config");


const simpleGetRequest = (query) => {
    return (request, response) => {
        pool.query(query, (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
      }
};

module.exports = {simpleGetRequest};