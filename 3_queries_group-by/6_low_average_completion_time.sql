SELECT students.name as student, AVG(assignment_submissions.duration) as average_assignment_duration, AVG(assignments.duration) AS average_estimated_duration
  FROM students
  JOIN assignment_submissions on (student_id = students.id)
  JOIN assignments on (assignment_submissions.assignment_id = assignments.id)
  WHERE students.end_date IS NULL 
  GROUP BY students.name
  HAVING AVG(assignment_submissions.duration) < AVG(assignments.duration)
  ORDER BY average_assignment_duration;
  
