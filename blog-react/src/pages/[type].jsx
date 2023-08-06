import Blog from "../components/Blog";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api_url } from "../constants/strings";

export default function BlogPage() {    
    const { type } = useParams();
    const [posts, setPosts] = useState([]);

    console.log(api_url)

    useEffect(() => {
        fetch(`${api_url}/api/posts/${type}`)
            .then((res) => res.json())
            .then(async (data) => {
                for (let i = 0; i < data.length; i++) {
                    const contentRes = await fetch(`${api_url}${data[i].contentURL}`)
                    const content = await contentRes.text()
                    data[i].content = content
                }

                // Order by date
                data.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                })
                setPosts(data);
            });
    }, [type]);


    return (
        <Blog posts={posts}/>
    )
}