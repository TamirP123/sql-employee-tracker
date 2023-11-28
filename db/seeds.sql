INSERT INTO department ( name)
VALUES ("Reverse Logistics"),
       ("Fulfillment"),
       ("General Merchandise");

INSERT INTO roles (title, salary, department_id)
VALUES ("Team Member", 35000, 003),
       ("Receiver", 35000, 001),
       ("Team Lead", 50000, 002),
       ("Executive Team Lead", 85000, 002);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Tamir', 'Phillips', 002, NULL),
  ('Shawn', 'Brown', 001, NULL),
  ('Ron', 'Johnson', 003, NULL),
  ('Kyrie', 'Irving', 004, NULL),
  ('Antonio', 'Smith', 001, 004);