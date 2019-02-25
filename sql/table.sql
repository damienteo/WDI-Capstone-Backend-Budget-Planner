CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    years INTEGER,
    goal INTEGER,
    monthlyIncome INTEGER,
    user_id INTEGER REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    expense INTEGER,
    month INTEGER,
    reason TEXT,
    user_id INTEGER REFERENCES users (id),
    created_on TIMESTAMPTZ DEFAULT Now(),
    created_at TIMESTAMPTZ  DEFAULT Now()
);