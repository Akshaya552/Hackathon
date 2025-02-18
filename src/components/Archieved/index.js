import "./index.css";
import { useEffect, useState } from "react";
import NoteItem from "../NoteItem";
import { useNavigate } from "react-router-dom";

const Archieved = () => {
  const [archievedList, setArchivedList] = useState([]);
  const [errormsg, setErrorMsgg] = useState("");
  const [isLoadi, setLoadi] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const archivedData = async () => {
      try {
        const response = await fetch(
          "https://hackathon-183r.onrender.com/notes"
        );
        const res = await response.json();
        setArchivedList(res);
      } catch (err) {
        setErrorMsgg(err.message);
      } finally {
        setLoadi(false);
      }
    };

    archivedData();
  }, []);


  const onClickdashboardBack = ()=>{
    navigate('/dashboard')
  }

  return (
    <>
      <nav className="archieved-nav">
        <img
          src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1739875997/Notes_App-removebg-preview_n4ku9p.png"
          alt="app-logo"
          className="archieved-app-logo"
        />
      </nav>
      <div className="remaining-half">
        {errormsg !== undefined && <p>{errormsg}</p>}
        {isLoadi ? (
          <div className="loader-container">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <div className="archive-row-container">
              <h1 className="heading">Archived Notes</h1>
              <button
                type="button"
                className="back-button"
                onClick={onClickdashboardBack}
              >
                Back
              </button>
            </div>

            <div className="notes-container">
            <div className="note-container">
                <p className="note-title">Title</p>
                <p className="content-title">Content</p>
                <p className="created-title">Created_at</p>
                <p className="created-title">last updated_date</p>
                <p className="category-title"> Category </p>
              </div>
              {archievedList.filter((each) => each.archieved === 1).length ===
              0 ? (
                <div className="empty-container">
                  <img
                    src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1739797680/people-checking-giant-check-list-background_23-2148091649-removebg-preview_jnkxij.png"
                    alt="empty-list"
                    className="empty-image"
                  />
                  <p className="empty-text">No Archived notes</p>
                </div>
              ) : (
                <ul className="unordered-list">
                  {archievedList
                    .filter((each) => each.archieved === 1)
                    .map((each) => (
                      <NoteItem data={each} key={each.id} />
                    ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Archieved;
