import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { MdArchive,MdUnarchive,MdDelete} from "react-icons/md";
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
        `https://hackathon-183r.onrender.com/notes/${id}/pin`,
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
         `https://hackathon-183r.onrender.com/notes/${id}/archive`,
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

  const onDelete = async(id)=>{
    const res = await fetch(`https://hackathon-183r.onrender.com/notes/${id}`, {
      method:"DELETE"
    })
    if(res.ok===true){
      window.location.reload()
    }
  }


  return (
   <li className="note-container">
     <Link to={`/notes/${id}`} className='link-item'>
    <h2 className="note-card" >{title}</h2>
    <h2 className="content-card" >{content}</h2>
    <h2 className="created-card">{created_at}</h2>
    <h2 className="created-card">{updated_at}</h2>
    <h2 className="category-card" >{category}</h2>
    </Link>
      <button
        type="button"
        className="pin-button"
        onClick={() => onClickChangePin(id)}
      >
       {pinned ? <p><TbPinnedFilled size={20} />pinned </p>: <p> <TbPinned size={20} />pin</p> }
      </button>
    <Link to={`/Edit/${id}/${title}/${content}/${category}`} className='pin-button'>
      <CiEdit size={20} />
      edit
    </Link>
    <button type="button" className="pin-button" onClick={()=>onChangeArchieve(id)}>
      {archieved ?<p><MdUnarchive size={20}/>release </p>: <p><MdArchive size={20}  />archive</p>}
    </button>
    <button type="button" className="pin-button" onClick={()=>onDelete(id)}>
      <MdDelete size={20} />delete
    </button>
  </li>
    
  );
};

export default NoteItem;
