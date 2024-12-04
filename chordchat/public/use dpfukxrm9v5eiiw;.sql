use dpfukxrm9v5eiiw;

CREATE TABLE users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,  -- Replaced AUTO_INCREMENT with IDENTITY
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student',  -- Removed CHECK constraint to apply separately
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_role CHECK (role IN ('student', 'admin'))  -- Proper placement of CHECK constraint
);

CREATE TABLE courses (
    course_id INT IDENTITY(1,1) PRIMARY KEY,  -- Replaced AUTO_INCREMENT with IDENTITY
    course_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments table
CREATE TABLE enrollments (
    enrollment_id INT IDENTITY(1,1) PRIMARY KEY,  -- Replaced AUTO_INCREMENT with IDENTITY
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

-- Chat Rooms table
CREATE TABLE chat_rooms (
    chat_room_id INT IDENTITY(1,1) PRIMARY KEY,  -- Replaced AUTO_INCREMENT with IDENTITY
    course_id INT NOT NULL,
    chat_room_name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

-- Chat Logs table
CREATE TABLE chat_logs (
    message_id INT IDENTITY(1,1) PRIMARY KEY,  -- Replaced AUTO_INCREMENT with IDENTITY
    chat_room_id INT NOT NULL,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_room_id) REFERENCES chat_rooms(chat_room_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- User Courses table
CREATE TABLE user_courses (
    user_course_id INT IDENTITY(1,1) PRIMARY KEY,  -- Replaced AUTO_INCREMENT with IDENTITY
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    CONSTRAINT UC_UserCourse UNIQUE(user_id, course_id)  
);

-- Profiles table
CREATE TABLE profiles (
    profile_id INT IDENTITY(1,1) PRIMARY KEY,  -- Replaced AUTO_INCREMENT with IDENTITY
    user_id INT NOT NULL,
    bio TEXT,
    profile_picture_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Feedback table
CREATE TABLE feedback (
    feedback_id INT IDENTITY(1,1) PRIMARY KEY,  -- Replaced AUTO_INCREMENT with IDENTITY
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    feedback VARCHAR(500) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Insert sample data into the courses table
INSERT INTO courses (course_name, description) 
VALUES 
('Full Stack Development', 'Full Stack Development'),
('AI/ML', 'AI/ML'),
('Data Science', 'Data Science'),
('Advanced Programming', 'Advanced Programming'),
('Big Data', 'Big Data'),
('IOT', 'IOT');


select * from users;
