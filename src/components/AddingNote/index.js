import { useState } from "react";
import "./index.css";
import { LuClipboardPen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const AddingNote = () => {
  const [titlenote, setTitleNote] = useState("");
  const [contentnote, setContentNote] = useState("");
  const [categorynote, setCategoryNote] = useState("work");
  const history = useNavigate();

  const onChangetitleNote = (event) => {
    setTitleNote(event.target.value);
  };

  const onChangeContentNote = (event) => {
    setContentNote(event.target.value);
  };

  const onChangeCategoryNote = (event) => {
    setCategoryNote(event.target.value);
  };

  const onClickAddNoteButton = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        title: { titlenote },
        content: { contentnote },
        categpry: { categorynote },
      }),
    };
    const response = await fetch(
      "https://hackathon-183r.onrender.com/notes",
      options
    );
    if (response.ok === true) {
      history("/dashboard");
    }
    console.log(response);
    setTitleNote("");
    setContentNote("");
    setCategoryNote("work");
  };

  return (
    <div className="add-container">
      <div className="image-style-container">
        <img
          src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1739875997/Notes_App-removebg-preview_n4ku9p.png"
          alt="app-logo"
          className="imageing"
        />
      </div>
      <h1 className="add-heading">
        Add a Note <LuClipboardPen size={25} />
      </h1>
      <input
        type="text"
        className="add-title"
        placeholder="Enter a title"
        required
        onChange={onChangetitleNote}
      />
      <textarea
        className="content-design"
        placeholder="Enter a note"
        required
        onChange={onChangeContentNote}
      ></textarea>
      <div className="add-row-container">
        <label htmlFor="categoryList" className="label-textdesign">
          Category:&nbsp;&nbsp;
        </label>
        <select
          id="categoryList"
          className="select-design"
          onChange={onChangeCategoryNote}
        >
          <option value="work">work</option>
          <option value="study">study</option>
          <option value="personal">personal</option>
          <option value="others">others</option>
        </select>
      </div>
      <button
        type="submit"
        className="back-button"
        onClick={onClickAddNoteButton}
      >
        Add Note
      </button>
    </div>
  );
};

export default AddingNote;
