import React from 'react'
import Post from '../components/Post'

function IndexPage() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch('https://fine-blue-shrimp-coat.cyclic.app/api/v1/post')
    .then(res => res.json())
    .then(posts => {
      setPosts(posts)
    })
  }, [])

  return (
    <div>
      { posts?.length > 0 
        ? posts.map(post => <Post {...post} />)
        : "No Post"
      }

    </div>
  )
}

export default IndexPage
