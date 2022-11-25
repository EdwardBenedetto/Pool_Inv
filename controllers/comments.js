const Comment = require("../models/Comment");

module.exports = {

  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.userName,
        createdBy: req.user.userName,
        createdbyID: req.user.id,
      });

      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    }

    catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      console.log(req.params.id)
      // let comment = await Comment.findById({ _id: req.params.id });
      await Comment.deleteOne({ _id: req.params.commentid });
      console.log("Deleted Comment");
      res.redirect("/post/" + req.params.postid);
    } catch (err) {
      res.redirect("/post/" + req.params.postid);
    }
  },
};

