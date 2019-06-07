export default function makePostsService({ dbRepository }) {
  const postModel = dbRepository.postModel;
  return {
    find: async ({ q = '' }) => {
      let query = {};
      // search by a q param on all fields. (optional)
      if (q !== '') {
        const qs = `.*${q}*.`;
        query = {
          $or:[
            { title: { $regex: qs, $options: 'i' } },
            { text: { $regex: qs, $options: 'i' } },
            { status: { $regex: qs, $options: 'i' } }
          ]
        };
      }
      try {
        return await postModel.find(query);
      } catch(error) {
        return error;
      }
    },

    findById: async (id) => {
      return await postModel.findById(id);
    },

    save: async (post) => {
      const data = new postModel();
      data.title = post.title;
      data.text = post.text;
      data.status = post.status;

      try {
        return await data.save();
      } catch(error) {
        return error;
      }
    },

    update: async (id, post) => {
      const data = await postModel.findById(id);
      if (post.title !== undefined && post.title.trim() !== '') {
        data.title = post.title;
      }
      if (post.text !== undefined && post.text.trim() !== '') {
        data.text = post.text;
      }
      if (post.status !== undefined && post.status.trim() !== '') {
        data.status = post.status;
      }
      try {
        return await data.save();
      } catch(error) {
        return error;
      }
    },

    remove: async (id) => {
      try {
        return postModel.deleteOne({ _id : id });
      } catch(error) {
        return error;
      }
    },

    removeAll: async() => {
      try {
        return postModel.deleteMany({});
      } catch(error) {
        return error;
      }
    }
  };
}
