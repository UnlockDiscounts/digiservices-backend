import Post from "../models/blog.js";


// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { header, description, category } = req.body;

    const imageUrls = req.files?.map(f => f.path) || [];

    const post = await Post.create({
      header,
      description,
      category,
      images: imageUrls
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET ALL POSTS
export const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};


// GET SINGLE POST
export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
};


// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const { header, description, category } = req.body;

    const imageUrls = req.files?.map(f => f.path);

    const update = { header, description, category };
    if (imageUrls?.length) update.images = imageUrls;

    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE POST
export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
