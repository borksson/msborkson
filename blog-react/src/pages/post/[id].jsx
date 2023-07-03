import { BlogPost } from "../../components/Blog/BlogPost";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BlogPostId() {
    const { id } = useParams();

    const [post, setPost] = useState({});
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(`/api/post/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                fetch(`${data.contentURL}`)
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