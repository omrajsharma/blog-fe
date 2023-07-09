import React, { useEffect } from 'react'
import alert from '../utilities/alert';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';

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
    const [files, setFiles] = React.useState('')
    
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/post/' + postId)
        .then(res => res.json())
        .then(data => {
            setTitle(data.title)
            setSummary(data.summary)
            setContent(data.content)
        })
    }, [])

    const updatePost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        if (files?.[0]) {
            data.set('file', files?.[0])
        }

        const response = await fetch('http://localhost:3000/api/v1/post/' + postId, {
            method: 'PUT',
            body: data,
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
