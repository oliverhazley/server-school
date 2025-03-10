# Health Diary Database

This diagram represents the relational database for the Health Diary app.

```mermaid
erDiagram

    Users {
        int user_id PK "Primary Key"
        varchar username "Unique"
        varchar password
        varchar email "Unique"
        datetime created_at
        enum user_level "regular | admin | moderator"
    }

    DiaryEntries {
        int entry_id PK "Primary Key"
        int user_id FK "Foreign Key"
        date entry_date
        varchar mood
        decimal weight
        int sleep_hours
        text notes
        datetime created_at
    }

    WorkoutLogs {
        int workout_id PK "Primary Key"
        int user_id FK "Foreign Key"
        date workout_date
        varchar workout_type
        int duration
        int calories_burned
        datetime created_at
    }

    Meals {
        int meal_id PK "Primary Key"
        int user_id FK "Foreign Key"
        date meal_date
        enum meal_type "Breakfast | Lunch | Dinner | Snack"
        int calories
        text notes
        datetime created_at
    }

    Users ||--o{ DiaryEntries : "has"
    Users ||--o{ WorkoutLogs : "has"
    Users ||--o{ Meals : "has"
