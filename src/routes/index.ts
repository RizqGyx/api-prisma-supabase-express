const router = require("express").Router();

const TodoRouter = require("./toDoRouter");

router.use("/api/v1/todo", TodoRouter);

module.exports = router;
