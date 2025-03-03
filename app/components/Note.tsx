"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

type Note = {
  text: string;
  completed: boolean;
};

export default function NoteApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load notes from localStorage
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) setNotes(JSON.parse(storedNotes));
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Scroll to bottom when notes change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [notes]);

  const addNote = () => {
    if (!input.trim()) return;
    setNotes([...notes, { text: input, completed: false }]);
    setInput("");
  };

  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const toggleComplete = (index: number) => {
    setNotes(
      notes.map((note, i) =>
        i === index ? { ...note, completed: !note.completed } : note
      )
    );
  };

  return (
    <div className="h-screen">
      <h1 className="text-3xl w-full text-center font-black py-4 h-[10vh]">
        نوت بوک 🗒️
      </h1>
      <div className="flex flex-col items-center justify-between md:py-4 h-[90vh]">
        <div
          ref={scrollRef}
          className="w-full max-w-md h-full overflow-y-auto px-4 md:px-0 flex flex-col gap-2"
        >
          {notes.length === 0 ? (
            <div className="w-full max-w-md h-full flex flex-col items-center justify-center">
              <Image width={200} height={200} className="w-3/5" src="/meme.jpg" alt="امروز هیچ کاری نمونده!" />
              <p className="text-lg font-bold">
                امروز همه کارارو انجام دادی! 🚀
              </p>
              <p className="opacity-90">یه نوت جدید تایپ کن.</p>
            </div>
          ) : (
            notes.map((note, index) => (
              <div
                key={index}
                className={`flex justify-between items-center bg-blue-200/30 rounded-lg p-2 transition-all ${
                  note.completed ? "opacity-80" : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={note.completed}
                    onChange={() => toggleComplete(index)}
                    className="w-5 h-5 cursor-pointer accent-black"
                  />
                  <span
                    className={`px-3 text-lg ${
                      note.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {note.text}
                  </span>
                </div>
                <button onClick={() => deleteNote(index)} className="p-2 cursor-pointer">
                  <RiDeleteBin5Fill size={20} />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="p-4 w-full flex justify-center items-center">
          <div className="w-full flex justify-center items-center gap-1 max-w-md px-2 py-4 bg-gray-100 rounded-xl">
            <input
              className="w-full px-2 min-h-10 h-auto rounded-lg bg-gray-100 text-black focus:outline-none"
              placeholder="یادداشت جدید..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") addNote();
              }}
            />
            <button
              onClick={addNote}
              className="size-10 hover:bg-gray-200/50 rounded-xl text-black text-3xl"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
