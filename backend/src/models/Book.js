import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  openLibraryId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  authors: [{ type: String }],
  coverUrl: { type: String, default: "" },
  firstPublishYear: { type: String, default: "N/A" },
  reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  available: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
