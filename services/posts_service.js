export default function makePostsService({ dbRepository }) {
  const postModel = dbRepository.postModel;
  return {
    find: async () => {
      return await postModel.find();
    },
    // TODO: find to text search

    findById: async (id) => {
      return await postModel.findById(id);
    },

    save: async (post) => {
      let data = new postModel();
      data.title = post.title;
      data.text = post.text;
      data.status = post.status;

      return await data.save();
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
      return await data.save();
    },

    remove: async (id) => {
      return postModel.remove({_id : id});
    }
  };
}
