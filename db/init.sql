-- Reset DB if exists (i guess for teachers testing)
DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

-- Create the Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_level ENUM('regular', 'admin', 'moderator') DEFAULT 'regular'
);

-- Create the DiaryEntries table
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE --Cascade delete to remove child data also (example - user id = 1's data in meals table)
);

-- Create the WorkoutLogs table
CREATE TABLE WorkoutLogs (
    workout_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    workout_date DATE NOT NULL,
    workout_type VARCHAR(50),
    duration INT,
    calories_burned INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE --Cascade delete to remove child data also
);

-- Create the Meals table
CREATE TABLE Meals (
    meal_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    meal_date DATE NOT NULL,
    meal_type ENUM('Breakfast', 'Lunch', 'Dinner', 'Snack'),
    calories INT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE --Cascade delete to remove child data also
);

-- Insert mock data into Users
INSERT INTO Users (username, password, email, user_level) VALUES
('johndoe', 'temp-pw-1', 'johndoe@example.com', 'regular'),
('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');

-- Insert mock data into DiaryEntries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES
(1, '2024-02-01', 'Happy', 70.5, 8, 'Had a great day, felt energetic'),
(1, '2024-02-02', 'Tired', 70.2, 6, 'Long day at work, need rest'),
(2, '2024-02-01', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out');

-- Insert mock data into WorkoutLogs
INSERT INTO WorkoutLogs (user_id, workout_date, workout_type, duration, calories_burned) VALUES
(1, '2024-02-01', 'Running', 30, 300),
(1, '2024-02-02', 'Cycling', 45, 400),
(2, '2024-02-01', 'Yoga', 60, 150);

-- Insert mock data into Meals
INSERT INTO Meals (user_id, meal_date, meal_type, calories, notes) VALUES
(1, '2024-02-01', 'Breakfast', 350, 'Oatmeal and coffee'),
(1, '2024-02-01', 'Lunch', 600, 'Chicken salad'),
(2, '2024-02-01', 'Dinner', 700, 'Steak and vegetables');

---------------------------- Sample Queries ------------------------

-- Get all users
SELECT * FROM Users;

-- Get all diary entries for a specific user
SELECT * FROM DiaryEntries WHERE user_id = 1;

-- Get all meals for a specific user
SELECT * FROM Meals WHERE user_id = 2;

-- Get all workouts for a specific user
SELECT * FROM WorkoutLogs WHERE user_id = 1;

-- Find users who have logged a workout
SELECT DISTINCT Users.username
FROM Users
JOIN WorkoutLogs ON Users.user_id = WorkoutLogs.user_id;

-- Find users who have logged meals
SELECT DISTINCT Users.username
FROM Users
JOIN Meals ON Users.user_id = Meals.user_id;

-- Update a user's password
UPDATE Users SET password = 'new-secure-password' WHERE user_id = 1;

-- Update a diary entry
UPDATE DiaryEntries SET mood = 'Energetic' WHERE entry_id = 1;

-- Delete a specific meal entry
DELETE FROM Meals WHERE meal_id = 2;

-- Delete a specific workout entry
DELETE FROM WorkoutLogs WHERE workout_id = 3;

-- Delete a user (CASCADE will delete related / child records)
DELETE FROM Users WHERE user_id = 2;
