import User from '../../models/user';

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
      return User.findById(userId);
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
};

export default userResolvers;
