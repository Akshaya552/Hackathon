import "./index.css";
import { useEffect, useState } from "react";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { useParams } from "react-router-dom";

const NoteDetailedView = (props) => {
  const [noteDetailed, setDeatiled] = useState([]);
  const [error, setErrorMsg] = useState("");
  const [isLoad, setLoad] = useState(true);
  const param = useParams()

  useEffect(() => {

    const fetchDeatiledData = async () => {
      const {id} = param
      try {
        const response = await fetch(
          `https://hackathonproject-ekn4.onrender.com/notes/${id}`
        );
        const res = await response.json();
        setDeatiled(res[0]);
        console.log(res)
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoad(false);
      }
    };

    fetchDeatiledData();
  }, []);

  const{title,content,created_at,updated_at,pinned,category} = noteDetailed

  return (
    <div className="notedetailed-container">
      <div className="notedetailed-card">
        {error !== undefined && <p>{error}</p>}
        {isLoad ? (
          <div className="detailed-load-container">
            <p>Loading...</p>{" "}
          </div>
        ) : (
          <div className="text-container" >
           <div className="horiz-container">
                <h1 className="title-heaidng">{title}</h1>
                {pinned ? <TbPinnedFilled size={25} /> : <TbPinned size={20} />}
            </div>
            <p className="content-text">{content}</p>
            <p className="answer"><span className="span-element">Category: </span>{category}</p>
            <p className="answer"><span className="span-element">Created on: </span>{created_at}</p>
            <p className="answer"><span className="span-element">Updated on: </span>{updated_at}</p>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default NoteDetailedView;
