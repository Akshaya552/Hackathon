import { MdOutlinePostAdd } from "react-icons/md";
import "./index.css";
import { useEffect, useState } from "react";
import NoteItem from "../NoteItem";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dataList, setDatalist] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  const[searchInput,setSearchInput] = useState('')
  const[category,setCategory] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hackathonproject-ekn4.onrender.com/notes"
        );
        const res = await response.json();
        setDatalist(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onChangeSearchInput = event=>{
    setSearchInput(event.target.value)
  }

  const categoryList  = dataList.filter(each=>each.category.toLowerCase().includes(category.toLowerCase()))

  const updatedList = categoryList.filter(each=>each.title.toLowerCase().includes(searchInput.toLowerCase()))

  const onSlectionChange = (event)=>{
      setCategory(event.target.value)
  }

  const onClickArchieved = ()=>{
    navigate('/archieved')
  }

  const onClickLogout = ()=>{
    navigate('/login')
  }

  return (
    <>
      <nav className="nav-container">
        <img
          src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1739731875/Notes_App_1_a3hw9s.png"
          alt="app-logo"
          className="nav-app-logo"
        />
        <div className="row-container-buttons">
          <button className="row-container-buttons normal-button">
            <MdOutlinePostAdd className="synbol" />
            add
          </button>
          <button className="normal-button" type="button" onClick={onClickArchieved}>
            Archieved
          </button>
          <button className="logout-button" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="remaining-half">
        {error !== undefined && <p>{error}</p>}
        {isLoading ? (
          <div className="loader-container">
            <p>Loading...</p>
          </div>
        ) : (
          <>
          <div className="search-head-contaienr"><h1 className="heading">Notes</h1> 
          <div className="filters-container">  
            <div className="filters-container">
              <label htmlFor="notes" className="category-label">Category: </label>
            <select id="notes" name="catge" className="select-element" onChange={onSlectionChange}>
            <option value="">all</option>
            <option value="study">study</option>
            <option value="work">work</option>
            <option value="personal">personal</option>
            <option value="others">others</option>
        </select>
            </div>
            <div className="only-search">
              <input type='search' className="search-input" onChange={onChangeSearchInput}/>
              < CiSearch  size={25}/>
            </div></div>
          
          </div>
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
              {updatedList.filter((each) => each.archieved === 0).length === 0 ? (
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
                  {updatedList
                    .filter((each) => each.archieved === 0)
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

export default Dashboard;
