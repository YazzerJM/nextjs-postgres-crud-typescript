

CREATE TABLE IF NOT EXISTE task (
    id SERIAL primary key,
    title VARCHAR(100) NO NULL
    description VARCHAR(200)
    created_on TIMESTAMP WHITE TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSER INTO TASK (title, description) VALUES ('Task 1', 'Description 1');