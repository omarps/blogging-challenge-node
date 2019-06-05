export default function makePostsService({ dbRepository }) {
  const postModel = dbRepository.postModel;
  return {
    find: () => {
      return postModel.find()
        .catch(error => error);
    },
    // TODO: find to text search

    findById: (id) => {
      return postModel.findById(id)
        .catch(error => error)
    },

    save: (post) => {
      let data = new postModel();
      data.title = post.title;
      data.text = post.text;
      data.status = post.status;

      return data.save()
        .catch(error => error);
    },

    update: (id, post) => {
      return postModel.findById(id)
        .then(data => {
          if (post.title !== undefined && post.title.trim() !== '') {
            data.title = post.title;
          }
          if (post.text !== undefined && post.text.trim() !== '') {
            data.text = post.text;
          }
          if (post.status !== undefined && post.status.trim() !== '') {
            data.status = post.status;
          }
          return data
        })
        .then(data => data.save())
        .catch(error => error);
    },

    remove: (id) => {
      return postModel.remove({_id : id})
        .catch(error => error)
    }
  };
}
