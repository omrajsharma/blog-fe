import React from 'react'
import { useParams } from 'react-router-dom'

function PostDetail() {
  const {postId} = useParams();
  const [postInfo, setPostInfo] = React.useState({});

  React.useEffect(() => {
    fetch('http://localhost:3000/api/v1/post/' + postId)
    .then(res => {
        if (res.ok) {
            res.json().then(data => setPostInfo(data))
        } else {
            setPostInfo(null)
        }
    })
  }, [])

  return (
    <div className='post-detail'>
        { postInfo ? (
            <div className="post-detail-container">
                <div className="post-detail-header">
                    <h1>
                        {postInfo.title}
                    </h1>
                    <p>
                        {postInfo.updatedAt}
                    </p>
                    <h4>
                        <span>By</span> {postInfo?.author?.username?.toUpperCase()}
                    </h4>
                </div>
                <div className="post-detail-img">
                    <img src={"http://localhost:3000/" + postInfo.cover} alt="" />
                </div>
                <div className="post-detail-content">
                    <div dangerouslySetInnerHTML={{__html: postInfo.content}} />
                </div>
            </div>
        ) : (
            <div className="post-detail-not-found">
                <h1>404</h1>
                <h4>There's nothing here!!!</h4>
                <p>Sorry, the page you are looking for in this blog doesn't exists.</p>
            </div>
        )}

    </div>
  )
}

export default PostDetail
