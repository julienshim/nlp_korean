const pool = require("../config/keys");

module.exports = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const pos = req.query.pos;
    const kor = req.query.kor;
    const han = req.query.han;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const entriesCount = await pool.query(`SELECT COUNT(*) FROM ${model}`);

    if (endIndex < entriesCount.rows[0].count) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    results.total_entries = entriesCount.rows[0].count;

    try {
      let query = "";
      console.log(han, han === undefined);
      if (han === undefined) {
        query = `SELECT * FROM ${model} WHERE korean='${kor}' AND part_of_speech='${pos}' ORDER BY CASE WHEN vocabulary_by_level = '초급' THEN 1 WHEN vocabulary_by_level = '중급' THEN 2 WHEN vocabulary_by_level ='고급' THEN 3 ELSE 4 END LIMIT ${limit} OFFSET ${startIndex}`;
      } else {
        if (han.startsWith("%") || han.endsWith("%")) {
          query = `SELECT * FROM ${model} WHERE korean='${kor}' AND part_of_speech='${pos}' AND original_language LIKE '${han}' ORDER BY CASE WHEN vocabulary_by_level = '초급' THEN 1 WHEN vocabulary_by_level = '중급' THEN 2 WHEN vocabulary_by_level ='고급' THEN 3 ELSE 4 END LIMIT ${limit} OFFSET ${startIndex}`;
        } else {
          query = `SELECT * FROM ${model} WHERE korean='${kor}' AND part_of_speech='${pos}' AND original_language='${han}' ORDER BY CASE WHEN vocabulary_by_level = '초급' THEN 1 WHEN vocabulary_by_level = '중급' THEN 2 WHEN vocabulary_by_level ='고급' THEN 3 ELSE 4 END LIMIT ${limit} OFFSET ${startIndex}`;
        }
      }
      const allEntries = await pool.query(query);
      results.results = allEntries.rows;
      res.paginatedResults = results;
      next();
    } catch (err) {
      res.sendStatus(500);
    }
  };
};
