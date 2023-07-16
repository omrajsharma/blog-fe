import React, { useEffect } from 'react'
import alert from '../utilities/alert';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
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

function EditPost() {
    const {postId} = useParams();
    const [redirect, setRedirect] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [summary, setSummary] = React.useState('')
    const [content, setContent] = React.useState('')
    const [thumbnail, setThumbnail] = React.useState('')
    const [files, setFiles] = React.useState('')
    
    useEffect(() => {
        fetch('https://fine-blue-shrimp-coat.cyclic.app/api/v1/post/' + postId)
        .then(res => res.json())
        .then(data => {
            setTitle(data.title)
            setSummary(data.summary)
            setContent(data.content)
            setThumbnail(data.thumbnail)
        })
    }, [])

    const updatePost = async (e) => {
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
        if (content.length < 30 || summary.length >= 50000) {
            alert('error' ,'content should be greater than 30 characters or your content is too large')
            return
        }

        let newThumbnail;
        if (files[0]) {
            const fileExtension = files[0].name.split('.').pop();
            const randomFileName = `${uuidV4()}.${fileExtension}`;
            const storageRef = ref(storage, `/thumbnail/${randomFileName}`);
            const uploadCover = uploadBytesResumable(storageRef, files[0]);
            newThumbnail = `https://firebasestorage.googleapis.com/v0/b/blogs-45a6e.appspot.com/o/thumbnail%2F${randomFileName}?alt=media&token=2bab6f3e-a6fb-4e5f-bf7f-91d2c493a75e`;
        }

        const response = await fetch('https://fine-blue-shrimp-coat.cyclic.app/api/v1/post/' + postId, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                summary,
                content,
                thumbnail: newThumbnail ? newThumbnail : thumbnail
            }),
            headers: {
                "Content-type" : "application/json"
            },
            credentials: 'include'
        })
        if (response.ok) {
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/post/' + postId} />
    }

  return (
    <form className='post-editor' onSubmit={updatePost}>
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

        <button>Update Post</button>
    </form>
  )
}

export default EditPost
