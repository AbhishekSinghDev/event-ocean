"use server";

import { CreateEventParams } from "@/types";
import { handleError } from "../utils";
import connectToDatabase from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "../database/models/category.model";

const populateEvent = async (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

const createEvent = async ({ event, userId, path }: CreateEventParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (err) {
    handleError(err);
  }
};

const getEventById = async (eventId: string) => {
  try {
    await connectToDatabase();

    const eventDetails = await populateEvent(Event.findById(eventId));

    if (!eventDetails) {
      throw new Error("Event not found");
    }

    return JSON.parse(JSON.stringify(eventDetails));
  } catch (err) {
    handleError(err);
  }
};

export { createEvent, getEventById };
