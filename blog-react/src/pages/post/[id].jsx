import { BlogPost } from "../../components/Blog/BlogPost";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api_url } from "../../constants/strings";

export default function BlogPostId() {
    const { id } = useParams();

    const [post, setPost] = useState({});
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(`${api_url}/api/post/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                fetch(`${api_url}${data.contentURL}`)
                    .then((res) => res.text())
                    .then((data) => setContent(data));
            });
    }, [id]);


    return (
        <Box pt={["20%", "1%"]}>
            <BlogPost post={post} content={content}/>
        </Box>
    )
}