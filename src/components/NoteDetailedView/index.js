import "./index.css";
import { useEffect, useState } from "react";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

const NoteDetailedView = (props) => {
  const [noteDetailed, setDeatiled] = useState([]);
  const [error, setErrorMsg] = useState("");
  const [isLoad, setLoad] = useState(true);
  const param = useParams()
  const histroy = useNavigate()

  useEffect(() => {

    const fetchDeatiledData = async () => {
      const {id} = param
      try {
        const response = await fetch(
          `https://hackathon-183r.onrender.com/notes/${id}`
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
  }, [param]);

  const{title,content,created_at,updated_at,pinned,category} = noteDetailed

  const onClickGetBack=()=>{
    histroy('/dashboard')
  }

  return (
    <div className="notedetailed-container">
       <div className='image-style-container'><img
          src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1739875997/Notes_App-removebg-preview_n4ku9p.png"
          alt="app-logo"
          className="imageing"
        /></div>
      <div className="notedetailed-card">
        {error !== undefined && <p>{error}</p>}
        {isLoad ? (
          <div className="detailed-load-container">
            <p>Loading...</p>
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
            <button type="button" className="back-button"  onClick={onClickGetBack}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetailedView;
