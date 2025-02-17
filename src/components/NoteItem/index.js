import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { MdOutlineArchive, MdArchive} from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import "./index.css";
import { Link } from "react-router-dom";


const NoteItem = (props) => {
  const { data} = props;
  const {
    id,
    title,
    content,
    category,
    created_at,
    updated_at,
    pinned,
    archieved,
  } = data;


  const getpinvalue =()=>{
    if(pinned===0 || false){
        return true
    }else{
        return false
    }

  }

  const getArchiveValue = ()=>{
    if(archieved===0 || false){
        return true
    }else{
        return false
    }
  }

  const onClickChangePin = async (id) => {
    try {
      let updatedPin =  getpinvalue()
    
     const response= await fetch(
        `https://hackathonproject-ekn4.onrender.com/notes/${id}/pin`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pinned: updatedPin }),
        }
      );
      if(response.ok===true){
        window.location.reload();
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeArchieve = async (id) => {
    try {
      let archiveUpdated = getArchiveValue()
      const res =await fetch(
         `https://hackathonproject-ekn4.onrender.com/notes/${id}/archive`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ archieved: archiveUpdated }),
        }
      )
      if(res.ok===true){
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  



  return (
   <li className="note-container">
     <Link to={`/notes/${id}`} className='link-item'>
    <p className="note-card" >{title}</p>
    <p className="content-card" >{content}</p>
    <p className="note-card">{created_at}</p>
    <p className="note-card">{updated_at}</p>
    <p className="note-card" >{category}</p>
    </Link>
      <button
        type="button"
        className="pin-button"
        onClick={() => onClickChangePin(id)}
      >
       {pinned ? <TbPinnedFilled size={20} /> : <TbPinned size={20} />}
      </button>
    <button type="button" className="pin-button" >
      <CiEdit size={20} />
      edit
    </button>
    <button type="button" className="pin-button" onClick={()=>onChangeArchieve(id)}>
      {archieved ? <MdArchive size={20}/> : <MdOutlineArchive size={20} />}
    </button>
  </li>
    
  );
};

export default NoteItem;
