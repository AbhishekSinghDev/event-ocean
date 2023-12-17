import mongoose, { models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price?: string;
  isFree: boolean;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; fristName: string; lastName: string };
}

const EventSchema: mongoose.Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, required: true, default: Date.now },
  endDateTime: { type: Date, required: true, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || mongoose.model("Event", EventSchema);
export default Event;
