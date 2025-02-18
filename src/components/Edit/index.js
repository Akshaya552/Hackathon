import { useState } from 'react';
import './index.css'
import { useParams, useNavigate } from 'react-router-dom';

const Edit = ()=>{
    const param = useParams()
    const id = param.id
    const title = param.title
    const content = param.content
    const category = param.categorys
    const [titleEdited,EditedtitleValue] = useState(title)
    const [contentEdited, EditedContentValue] = useState(content)
    const [categoryEdited,EditedCategoryValue] = useState(category)
    const hinder = useNavigate()

    const onChangetitleNote = event=>{
        EditedtitleValue(event.target.value)
    }

    const onChangeContentNote = event=>{
        EditedContentValue(event.target.value)
    }

    const onChangeCategoryNote = event=>{
        EditedCategoryValue(event.target.value)
    }

    const onClickEdit = async()=>{
        const respons = await fetch(`https://hackathon-183r.onrender.com/notes/${id}`,{
            method:"PUT",
            body: JSON.stringify({
              title : titleEdited,
              content: contentEdited,
              category: categoryEdited
            })
          })
          console.log(respons)
        if(respons.ok===true){
          hinder('/dashboard')
        }
        
    }

    return<div className='add-container'>
        <div className='image-style-container'><img
          src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1739875997/Notes_App-removebg-preview_n4ku9p.png"
          alt="app-logo"
          className="imageing"
        /></div>
        <input type='text' className='add-title' placeholder='Enter a title' value={titleEdited} required onChange={onChangetitleNote}/>
        <textarea className='content-design' placeholder='Enter a note' value={contentEdited} required onChange={onChangeContentNote}></textarea>
        <div className='add-row-container'>
        <label htmlFor='categoryList' className='label-textdesign'>Category:&nbsp;&nbsp;</label>
        <select id='categoryList' className='select-design' value={categoryEdited} onChange={onChangeCategoryNote}>
        <option value='work' >work</option>
        <option value='study' >study</option>
        <option value='personal' >personal</option>
        <option value='others' >others</option>
        </select>
        </div>
        <button type="submit"  className="back-button" onClick={onClickEdit}>Edit Note</button>
        </div>
}

export default Edit