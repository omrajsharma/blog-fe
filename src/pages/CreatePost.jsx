import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

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
    const [title, setTitle] = React.useState('')
    const [summary, setSummary] = React.useState('')
    const [content, setContent] = React.useState('')
    const [files, setFiles] = React.useState('')

    const createNewPost = async (e) => {
        e.preventDefault();

        if (!title || !summary || !content) {
            alert('Please fill all the fields!')
        }
        if (title.length < 3 && title.length >= 100) {
            alert('title should be greater than 3 characters and less than equals to 100 characters')
        }
        if (summary.length < 30 && summary.length >= 300) {
            alert('summary should be greater than 30 characters and less than equals to 300 characters')
        }
        if (content.length < 30 && summary.length >= 50000) {
            alert('content should be greater than 30 characters or your content is too large')
        }
        
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        const response = await fetch('http://localhost:3000/api/v1/post', {
            method: "POST",
            body: data,
        })
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
