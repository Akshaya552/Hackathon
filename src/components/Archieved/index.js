import "./index.css";
import { useEffect, useState } from "react";
import NoteItem from "../NoteItem";

const Archieved = () => {
  const [archievedList, setArchivedList] = useState([]);
  const [errormsg, setErrorMsgg] = useState("");
  const [isLoadi, setLoadi] = useState(true);

  useEffect(() => {
    const archivedData = async () => {
      try {
        const response = await fetch(
          "https://hackathonproject-ekn4.onrender.com/notes"
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

  return (
    <>
      <nav className="archieved-nav">
        <img
          src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1739731875/Notes_App_1_a3hw9s.png"
          alt="app-logo"
          className="archieved-app-logo"
        />
      </nav>
      <div className="remaining-half">
        {errormsg !== undefined && <p>{errormsg}</p>}
        {isLoadi ? (
          <div className="loader-container">
            <p>Loading...</p>{" "}
          </div>
        ) : (
          <>
            <h1 className="heading">Archived Notes</h1>
            <div className="notes-container">
              <div className="heading-container">
                <p className="title-name">Title</p>
                <p className="title-name">Content</p>
                <p className="title-name">Created_at</p>
                <p className="title-name">last updated_date</p>
                <p className="title-name">
                  Category <br />
                  (personal, work, study, others)
                </p>
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
