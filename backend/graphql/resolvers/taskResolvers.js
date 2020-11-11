import Task from '../../models/task';

const taskResolvers = {
  tasks: async () => {
    try {
      const tasks = await Task.find().populate('createdBy');
      return tasks;
    } catch (err) {
      throw err;
    }
  },

  getTask: async ({ taskId }) => {
    try {
      return Task.findById(taskId).populate('createdBy');
    } catch (err) {
      throw err;
    }
  },

  createTask: async (args) => {
    try {
      const { title, description, price, category } = args.inputTask;
      const task = new Task({
        title,
        description,
        price,
        bid: 0,
        category,
        createdBy: '5fa380567491ac380d90acb5',
      });
      await task.save();
      return Task.populate(task, 'createdBy');
    } catch (err) {
      throw err;
    }
  },

  editTask: async (args) => {
    try {
      const { title, description, price, category } = args.inputTask;
      const editedTask = await Task.findByIdAndUpdate(
        args.taskId,
        {
          title,
          description,
          price,
          bid,
          category
        },
        { new: true }
      );
      return Task.populate(editedTask, 'createdBy');
    } catch (err) {
      throw err;
    }
  },

  deleteTask: async ({ taskId }) => {
    try {
      const deletedTask = await Task.findById(taskId).populate('createdBy');
      await Task.deleteOne(deletedTask);
      return deletedTask;
    } catch (err) {
      throw err;
    }
  },
};

export default taskResolvers;
