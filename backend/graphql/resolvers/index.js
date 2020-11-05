import Task from '../../models/task';
import User from '../../models/user';

const resolvers = {
  createUser: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('Email already in use');
      }
      const newUser = new User({
        email,
        password,
      });

      await newUser.save();
      return newUser.validatePassword(password);
    } catch (err) {
      throw err;
    }
  },

  loginUser: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      return user.validatePassword(password);
    } catch (err) {
      throw err;
    }
  },

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
