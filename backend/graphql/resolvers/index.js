import Task from '../../models/task';

const resolvers = {
  tasks: async () => {
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (err) {
      throw err;
    }
  },
  createTask: async (args) => {
    try {
      const { title, description, price } = args.inputTask;
      const task = new Task({
        title,
        description,
        price,
      });

      await task.save();
      return task;
    } catch (err) {
      throw err;
    }
  },
  editTask: async (args) => {
    try {
      const { title, description, price } = args.inputTask;
      const editedTask = await Task.findByIdAndUpdate(
        args.taskId,
        {
          title,
          description,
          price,
        },
        { new: true }
      );
      return editedTask;
    } catch (err) {
      throw err;
    }
  },

  deleteTask: async ({ taskId }) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      return deletedTask;
    } catch (err) {
      throw err;
    }
  },
};

export default resolvers;
