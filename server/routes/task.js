const router = require("express").Router();
const db = require("../db");


router.post("/add", (req, res) => {

  const { title, description, status, user_id } = req.body;

  const sql =
    "INSERT INTO tasks(title,description,status,user_id) VALUES(?,?,?,?)";

  db.query(
    sql,
    [title, description, status, user_id],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json("Task Creation Failed");
      }

      res.json("Task Added Successfully");
    }
  );
});


router.get("/all", (req, res) => {

  const sql = "SELECT * FROM tasks";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json("Error Fetching Tasks");
    }

    res.json(result);
  });
});


router.put("/update/:id", (req, res) => {

  const { title, description, status } = req.body;

  const sql =
    "UPDATE tasks SET title=?, description=?, status=? WHERE id=?";

  db.query(
    sql,
    [title, description, status, req.params.id],
    (err, result) => {

      if (err) {
        return res.status(500).json("Update Failed");
      }

      res.json("Task Updated Successfully");
    }
  );
});


router.delete("/delete/:id", (req, res) => {

  const sql = "DELETE FROM tasks WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {

    if (err) {
      return res.status(500).json("Delete Failed");
    }

    res.json("Task Deleted Successfully");
  });
});


module.exports = router;