const { Pool } = require('pg');

const pool = new Pool({
  user: 'jennifermanwell',
  //password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

const queryString = `
SELECT students.id, students.name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON (students.cohort_id = cohorts.id)
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

pool.query(queryString, values)
.then(res => { 
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
  })
});

