import mongoose from "mongoose";

const three_d_model = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  js_file: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    // You might want to add validation or default values for thumbnails
  },
  _3dmodel: {
    type: String,
    // You might want to add validation or default values for thumbnails
  },
  isPublished: {
    type: Boolean,
  },
});
console.log(mongoose.models.three_d_model);
if (mongoose.models.three_d_model)
  console.log("The model already existed, hence no model created!!");
else console.log("Need to create a model!!!");
const ThreeDModels =
  mongoose.models.three_d_model ||
  mongoose.model("three_d_model", three_d_model);

export default ThreeDModels;
