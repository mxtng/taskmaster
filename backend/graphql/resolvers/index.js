import userResolvers from './userResolvers';
import taskResolvers from './taskResolvers';

const resolvers = {
  ...userResolvers,
  ...taskResolvers,
};

export default resolvers;
