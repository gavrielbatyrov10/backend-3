const prisma = require("./prisma");
const router = require("express").Router();
module.exports = router;

// GET all puppies
router.get("/", async (req, res, next) => {
  try {
    const puppies = await prisma.task.findMany();
    res.json(puppies);
  } catch (error) {
    console.error("Error fetching puppies:", error);
    next(error);
  }
});

// GET task by ID
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return next({
        status: 404,
        message: `task with ID #${id} does not exist.`,
      });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    next(error);
  }
});

// POST create a new task
router.post("/", async (req, res, next) => {
  try {
    const { name, breed } = req.body;
    const task = await prisma.task.create({
      data: { name, breed },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    next(error);
  }
});

// DELETE a task by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return next({
        status: 404,
        message: `task with ID #${id} does not exist.`,
      });
    }

    await prisma.task.delete({ where: { id } });

    // Respond with 201 Created and a confirmation message
    res
      .status(201)
      .json({ message: `task with ID #${id} has been successfully deleted.` });
  } catch (error) {
    console.error("Error deleting task:", error);
    next(error);
  }
});
