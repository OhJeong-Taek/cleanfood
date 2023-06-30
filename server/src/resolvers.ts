export const resolvers = {
    Query: {
        compLists: async (_, { id }, { dataSources }) => {
        return dataSources.cleanFoodAPI.getDirtyFoodCompList(id);
      },
      
    },
  };
