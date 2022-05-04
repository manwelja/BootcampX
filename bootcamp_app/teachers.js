const { Pool } = require('pg');

const pool = new Pool({
  user: 'jennifermanwell',
  //password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teachers.id = teacher_id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id   
  WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
  GROUP BY teachers.name, cohort
  ORDER BY teachers.name;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.teacher}`);
  })
});

