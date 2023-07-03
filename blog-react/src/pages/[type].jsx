import Blog from "../components/Blog";
import { api_url } from "../constants/strings";

export default function BlogPage({ posts }) {    
    return (
        <Blog posts={posts}/>
    )
}

export async function getStaticPaths() {
    const paths = [
        { params: { type: 'tech' } },
        { params: { type: 'blog' } }
    ]
    return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
    const type = params.type === 'tech' ? 'tech' : 'blog'
    const res = await fetch(`${api_url}/api/posts/${type}`)
    const posts = await res.json()
    for (let i = 0; i < posts.length; i++) {
        const contentRes = await fetch(`${api_url}${posts[i].contentURL}`)
        const content = await contentRes.text()
        posts[i].content = content
    }
    // Order by date
    posts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })
    return {
        props: { posts },
    }
}