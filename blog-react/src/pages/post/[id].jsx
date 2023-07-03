import { BlogPost } from "../../components/Blog/BlogPost";
import { Box } from "@chakra-ui/react";

import { api_url } from "../../constants/strings";

export default function BlogPostId({ post, content }) {
    return (
        <Box pt={["20%", "1%"]}>
            <BlogPost post={post} content={content}/>
        </Box>
    )
}

export async function getStaticPaths() {
    const blogRes = await fetch(`${api_url}/api/posts/blog`)
    const blogPosts = await blogRes.json()
    const techRes = await fetch(`${api_url}/api/posts/tech`)
    const techPosts = await techRes.json()
    const allPosts = blogPosts.concat(techPosts)
    const paths = allPosts.map((post) => ({
        params: { id: post.id.toString() },
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    let res = await fetch(`${api_url}/api/post/${params.id}`)
    console.log(`${api_url}/api/post/${params.id}`)
    const post = await res.json()
    // TODO: fix contentURL and also just use 
    res = await fetch(`${api_url}${post.contentURL}`)
    const content = await res.text()
    return { props: { post, content } }
}