INSERT INTO department ( name)
VALUES ("Reverse Logistics"),
       ("Fulfillment"),
       ("General Merchandise");

INSERT INTO roles (title, salary, department_id)
VALUES ("Team Member", 35000, 001),
       ("Team Lead", 50000, 002),
       ("Executive Team Lead", 85000, 002);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
  ('Tamir', 'Phillips', 1),
  ('Shawn', 'Brown', 2),
  ('Ron', 'Johnson', 3),
  ('Kyrie', 'Irving', 4);