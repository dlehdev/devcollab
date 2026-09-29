import { useState } from "react";

function TagInput({ label, tags, setTags, placeholder }) {
  const [input, setInput] = useState("");

const addTag = () => {
  const newTags = input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  if (newTags.length) setTags([...new Set([...tags, ...newTags])]);
  setInput("");
};

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTag();
  }
};

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <label className="text-xs text-text-secondary uppercase">{label}</label>
      <div className="mt-1 bg-surface border border-text-secondary/30 rounded px-3 py-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs bg-bg border border-text-secondary/20 rounded px-2 py-1 text-text-secondary flex items-center gap-1"
            >
              # {tag}
              <button type="button" onClick={() => removeTag(tag)} className="text-accent-coral">
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent text-text-primary text-sm placeholder-text-secondary/50 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default TagInput;