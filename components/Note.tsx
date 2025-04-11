"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

type Note = {
  text: string;
  completed: boolean;
};

export default function NoteApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load notes from localStorage
  useEffect(() => {
    const storedNotes = localStorage.getItem("cwpslxck/basicnote");
    if (storedNotes) setNotes(JSON.parse(storedNotes));
    setLoading(false);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("cwpslxck/basicnote", JSON.stringify(notes));
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
          className="w-full scroll max-w-md h-full overflow-y-auto px-4 md:px-0 flex flex-col gap-2"
        >
          {loading ? (
            <>
              <div className="bg-blue-200/30 rounded-lg">
                <div className="w-full p-2">
                  <div>
                    <span className="text-lg">‌</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-200/30 rounded-lg">
                <div className="w-full p-2">
                  <div>
                    <span className="text-lg">‌</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-200/30 rounded-lg">
                <div className="w-full p-2">
                  <div>
                    <span className="text-lg">‌</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {notes.length === 0 ? (
                <div className="w-full max-w-md h-full flex flex-col items-center justify-center">
                  <Image
                    draggable="false"
                    width={200}
                    height={200}
                    className="w-3/5"
                    src="/meme.jpg"
                    alt="امروز هیچ کاری نمونده!"
                  />
                  <p className="text-lg font-bold">
                    امروز همه کارارو انجام دادی! 🚀
                  </p>
                  <p className="opacity-90">یه نوت جدید تایپ کن.</p>
                </div>
              ) : (
                notes.map((note, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-blue-200/30 rounded-lg transition-all"
                  >
                    <div
                      className="w-full p-2 flex justify-start"
                      onClick={() => toggleComplete(index)}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span
                          className={`px-3 text-lg ${
                            note.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {note.text}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteNote(index)}
                      className="p-2 cursor-pointer"
                    >
                      <RiDeleteBin5Fill size={20} />
                    </button>
                  </div>
                ))
              )}
            </>
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
