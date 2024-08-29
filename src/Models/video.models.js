import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Define the schema for video documents
const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // Cloudinary URL for the video file
      required: true,
    },
    thumbnail: {
      type: String, // Cloudinary URL for the video thumbnail
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (adjust as needed)
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Plugin: Enable pagination using mongoose-aggregate-paginate-v2
videoSchema.plugin(mongooseAggregatePaginate);

// Create the Video model
export const Video = mongoose.model("Video", videoSchema);
