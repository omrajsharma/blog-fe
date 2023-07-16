import React from 'react'
import alert from '../utilities/alert';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../firebaseConfig';
import {v4 as uuidV4} from 'uuid';

const modules = {
toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
],
}

const formats = [
'header',
'bold', 'italic', 'underline', 'strike', 'blockquote',
'list', 'bullet', 'indent',
'link', 'image'
]

function CreatePost() {
    const [redirect, setRedirect] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [summary, setSummary] = React.useState('')
    const [content, setContent] = React.useState('')
    const [files, setFiles] = React.useState('')
    
    const createNewPost = async (e) => {
        e.preventDefault();
        
        if (!title || !summary || !content) {
            alert('error' ,'Please fill all the fields!')
            return
        }
        if (title.length < 3 || title.length >= 100) {
            alert('error' ,'title should be greater than 3 characters and less than equals to 100 characters')
            return
        }
        if (summary.length < 30 || summary.length >= 300) {
            alert('error' ,'summary should be greater than 30 characters and less than equals to 300 characters')
            return
        }
        if (!files[0]) {
            alert('error' ,'please select a thumbnail picture for blog')
            return
        }
        if (content.length < 30 || summary.length >= 50000) {
            alert('error' ,'content should be greater than 30 characters or your content is too large')
            return
        }

        const fileExtension = files[0].name.split('.').pop();
        const randomFileName = `${uuidV4()}.${fileExtension}`;
        const storageRef = ref(storage, `/thumbnail/${randomFileName}`);
        const uploadCover = uploadBytesResumable(storageRef, files[0]);
        
        const response = await fetch('https://fine-blue-shrimp-coat.cyclic.app/api/v1/post', {
            method: "POST",
            body: JSON.stringify({
                title,
                summary,
                content,
                thumbnail: `https://firebasestorage.googleapis.com/v0/b/blogs-45a6e.appspot.com/o/thumbnail%2F${randomFileName}?alt=media&token=2bab6f3e-a6fb-4e5f-bf7f-91d2c493a75e`
            }),
            headers: {
                "Content-type" : "application/json"
            },
            credentials: 'include',
        })
        
        if (response.ok) {
            setRedirect(true);
            alert('success', 'Blog post created successfully')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

  return (
    <form className='post-editor' onSubmit={createNewPost}>
        <input
            value={title}
            type="text" 
            placeholder='Title...'
            onChange={e => setTitle(e.target.value)}
            required
        />
        <input 
            value={summary}
            type="text" 
            placeholder='Summary...' 
            onChange={e => setSummary(e.target.value)}
            required
        />
        <input
            type="file"
            accept='image/png, image/gif, image/jpeg'
            onChange={e => setFiles(e.target.files)}
        />

        <ReactQuill
            value={content}
            module={modules}
            formats={formats}
            onChange={newValue => setContent(newValue)}
            required
        />

        <button>Create Post</button>
    </form>
  )
}

export default CreatePost
