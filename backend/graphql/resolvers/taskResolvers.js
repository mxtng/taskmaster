import Task from '../../models/task';
import User from '../../models/user';

const user = async (userId) => {
  try {
    return User.findById(userId);
  } catch (err) {
    throw err;
  }
};

const taskResolvers = {
  tasks: async () => {
    try {
      const tasks = await Task.find();
      return tasks.map((task) => {
        return {
          ...task._doc,
          id: task.id,
          createdBy: user.bind(null, task._doc.createdBy),
        };
      });
    } catch (err) {
      throw err;
    }
  },

  getTask: async ({ taskId }) => {
    try {
      const existingTask = await Task.findById(taskId);
      return {
        ...existingTask._doc,
        id: existingTask.id,
        createdBy: user.bind(null, existingTask._doc.createdBy),
      };
    } catch (err) {
      throw err;
    }
  },

  createTask: async (args, req) => {
    try {
      const { title, description, price, category } = args.inputTask;
      const newTask = new Task({
        title,
        description,
        price,
        bid: 0,
        category,
        createdBy: req.userId,
      });
      let createdTask;
      const result = await newTask.save();

      createdTask = {
        ...result._doc,
        id: result.id,
        createdBy: user.bind(this, result._doc.createdBy),
      };

      const existingUser = await User.findById(req.userId);
      if (!existingUser) {
        throw new Error('Email not found');
      }

      existingUser.tasks.push(newTask);
      await existingUser.save();

      return createdTask;
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
          category,
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
