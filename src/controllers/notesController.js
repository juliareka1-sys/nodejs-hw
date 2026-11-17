import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (request, response) => {
  const allNotes = await Note.find();
  response.status(200).json(allNotes);
};

export const getNoteById = async (request, response) => {
  const { noteId } = request.params;
  const selectedNote = await Note.findById(noteId);
  if (!selectedNote) {
    throw createHttpError(404, 'Note not found');
  }
  response.status(200).json(selectedNote);
};

export const createNote = async (request, response) => {
  const note = await Note.create(request.body);
  response.status(201).json(note);
};

export const deleteNote = async (request, response) => {
  const deletedNote = await Note.findOneAndDelete({
    _id: request.params.noteId,
  });
  if (!deletedNote) {
    throw createHttpError(404, 'Note not found');
  }

  response.status(200).json(deletedNote);
};

export const updateNote = async (request, response) => {
  const editedNote = await Note.findOneAndUpdate(
    { _id: request.params.noteId },
    request.body,
    { returnDocument: 'after' },
  );

  if (!editedNote) {
    throw createHttpError(404, 'Note not found');
  }
  response.status(200).json(editedNote);
};
