import User from '../../models/user';
import Task from '../../models/task';
import bcrypt from 'bcryptjs';

const user = (userId) => {
  return User.findById(userId)
    .then((user) => {
      return {
        ...user._doc,
        id: user.id,
        tasks: task.bind(null, user._doc.tasks),
      };
    })
    .catch((err) => {
      throw err;
    });
};

const task = (taskIds) => {
  return Task.find({ _id: { $in: taskIds } })
    .then((tasks) => {
      return tasks.map((task) => {
        return {
          ...task._doc,
          id: task.id,
          createdBy: user.bind(null, task._doc.createdBy),
        };
      });
    })
    .catch((err) => {
      throw err;
    });
};

const userResolvers = {
  users: async () => {
    try {
      return User.find();
    } catch (err) {
      throw err;
    }
  },

  getUser: async ({ userId }) => {
    try {
      const existingUser = await User.findById(userId);
      return {
        ...existingUser._doc,
        id: existingUser.id,
        tasks: task.bind(null, existingUser._doc.tasks),
      };
    } catch (err) {
      throw err;
    }
  },

  createUser: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (user) {
        throw new Error('Email already in use');
      }

      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) reject(new Error('Unable to create user'));
          resolve(hash);
        });
      });

      const newUser = new User({
        email,
        password: hashedPassword,
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
};

export default userResolvers;
