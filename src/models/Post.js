import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
