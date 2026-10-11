CREATE DATABASE IF NOT EXISTS study_planner;

USE study_planner;


CREATE TABLE subjects (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE assignments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    subject_id INT,

    title VARCHAR(200) NOT NULL,

    description TEXT,

    deadline DATE NOT NULL,

    priority ENUM(
        'Low',
        'Medium',
        'High'
    ) DEFAULT 'Medium',

    status ENUM(
        'Pending',
        'In Progress',
        'Completed'
    ) DEFAULT 'Pending',

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (subject_id)
    REFERENCES subjects(id)
);


INSERT INTO subjects (name)
VALUES
('Web Technology'),
('JavaScript'),
('PHP');


INSERT INTO assignments
(subject_id, title, description, deadline, priority, status)
VALUES

(
    1,
    'HTML Forms',
    'Create and design HTML forms',
    '2026-09-30',
    'Medium',
    'Completed'
),

(
    2,
    'DOM Manipulation',
    'Practice JavaScript DOM concepts',
    '2026-10-03',
    'High',
    'In Progress'
),

(
    3,
    'Form Validation',
    'Implement PHP form validation',
    '2026-10-05',
    'High',
    'Pending'
);