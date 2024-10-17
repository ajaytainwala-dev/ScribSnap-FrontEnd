import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { IoMdAdd, IoMdClose } from "react-icons/io";

const TagInput = ({ tags, setTags, type }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (removeTag) => {
    setTags(tags.filter((tag) => tag !== removeTag));
    event.preventDefault(); // Prevent form submission
  };


  return (
    <>
      <Grid item xs={12}>
        {tags?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mx-2 my-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-3 text-sm rounded text-slate-900 bg-slate-100"
              >
                #{tag}
                <button
                  onClick={() => {
                    handleRemoveTag(tag);
                    }}
                  >
                    <IoMdClose />
                  </button>
                  </span>
                ))}
                </div>
              )}
              <div
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                }}
              >
                <TextField
                required
                fullWidth
                id="tags"
                label="Tag"
                name="tags"
                autoComplete="tags"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={inputValue}
                />{" "}
                <IconButton
                onClick={() => {
              handleAddTag();
            }}
            // disable={isSubmitting}
          >
            <IoMdAdd
              style={{
                cursor: "pointer",
                fontSize: "2rem",
                color: "white",
                width: "50px ",
                height: "50px",
                backgroundColor: "slategrey",
                borderRadius: "8px",
                padding: "8px",
              }}
            />
          </IconButton>
        </div>
      </Grid>
    </>
  );
};

export default TagInput;
