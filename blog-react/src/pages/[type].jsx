import Blog from "../components/Blog";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BlogPage() {    
    const { type } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`https://api.msborkson.com/api/posts/${type}`)
            .then((res) => res.json())
            .then(async (data) => {
                for (let i = 0; i < data.length; i++) {
                    const contentRes = await fetch(`https://api.msborkson.com${data[i].contentURL}`)
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