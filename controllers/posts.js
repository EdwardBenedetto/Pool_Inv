const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
var fetch = require('node-fetch');
var request = require('request');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const sorted = await Post.find({ user: req.user.id }).sort({ price: "desc" })
      const total = posts.reduce((sum, item)=>item.price+=sum,0)
      res.render("profile.ejs", { posts: posts, user: req.user, total, sorted, search: '' });
    } catch (err) {
      console.log(err);
    }
  },
  getFinancials: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const sorted = await Post.find({ user: req.user.id }).sort({ price: "desc" })
      const total = posts.reduce((sum, item)=>item.price+=sum,0)
      res.render("financials.ejs", { posts: posts, user: req.user, total, sorted });
      
      // request(options, function (error, response) {
      //   var obj = JSON.parse(response.body)
      //   console.log(`Style average cost is $${obj.average_price}`)
      //   console.log(`Style median cost is $${obj.median_price}`)
      //   console.log(`Style min cost is $${obj.min_price}`)
      //   console.log(`Style max cost is $${obj.max_price}`)
      //   console.log(`Pulled from the results of ${obj.results} previously sold items`)
      // });
     
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts ,user: req.user});
        } catch (err) {
      console.log(err);
    }
  },

  marketInfo: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      const response = await fetch("https://ebay-sold-items-api.herokuapp.com/findCompletedItems", {
  method: "post",
  headers: {
       'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    keywords: "18 east cargo",
    max_search_results: "60",
    category_id: "260012",
    remove_outliers: true,
    site_id: "0"
  })
});

const data = await response.json();      
    } catch (err) {
      console.log(err);
    }
  },

    getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      const response = await fetch("https://ebay-sold-items-api.herokuapp.com/findCompletedItems", {
  method: "post",
  headers: {
       'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    keywords: `${post.title}`,
    max_search_results: "60",
    category_id: "260012",
    remove_outliers: true,
    site_id: "0"
  })
});

const data = await response.json();

      res.render("post.ejs", { post: post, user: req.user, comments: comments, data: data });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        desc: req.body.desc,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        type: req.body.type,
        year: req.body.year,
        season: req.body.season,
        price: req.body.price,
        askPrice: req.body.askPrice,
        createdAt: req.body.createdAt,
        likes: 0,
        user: req.user.id,
        notes: req.body.notes,
        userName: req.user.userName
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  }, 
  
  editPost: async (req, res)=>{



          let id = req.params.id;
          let err = '';
  
          let post = await Post.findById({ _id: req.params.id });
          let qry = {_id:id};

              res.render('edit', {post});
          
              await Post.remove({ _id: req.params.id });
          
      }
, updatePost: async (req, res) => {
//let post = await Post.findByID(req.params.id).lean()


  post = await Post.findOneAndUpdate(
    { _id: req.params.id }, {post: post})

  //res.redirect("/post/:id")

  await Post.remove({_id: req.params.id})
}

,

updateUser: async (req, res) => {
  try {
    if(req.file && req.body.name) {
      // delete current picture
      let user = await User.findById(req.params.id); 
      if (user.cloudinaryId) {
        await cloudinary.uploader.destroy(user.cloudinaryId);
      }
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            profileImage: result.secure_url,
            cloudinaryId: result.public_id
          }
        }
      )
      res.redirect(`/profile/${req.params.id}`);
    } else if (req.file && !req.body.name) {
      let user = await User.findById(req.params.id); 
      if (user.cloudinaryId) {
        await cloudinary.uploader.destroy(user.cloudinaryId);
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            profileImage: result.secure_url,
            cloudinaryId: result.public_id
          }
        }
      )
      res.redirect(`/profile/${req.params.id}`);
    } else if (!req.file && req.body.name) {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
          }
        }
      )
      res.redirect(`/profile/${req.params.id}`);
    } else {
      res.redirect(`/profile/${req.params.id}`);
    }
    
  } catch (err) {
    console.log(err);
  }
},
  
   getSearch: async(req, res) => {
    const posts = await Post.find().sort({ createdAt: "desc" }).lean();
    let q = req.body.searchInput;
    let postData = null;
    let sesh = req.session;
    let qry = ({ $text: { $search: q } });
  
    
         let postResult = await Post.find(qry).then( (posts) => {
        postData = posts;
      });
      console.log(qry.length)
    
  
    res.render('profile', {user: req.user, posts: postData, search:q});
  }
};


