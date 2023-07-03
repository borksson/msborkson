import { Box, Divider, Flex, VStack } from "@chakra-ui/react";
import { BlogPost } from "../../components/Blog/BlogPost";
import { useNavigate } from "react-router-dom";


export default function Blog({ posts }) {
    const navigate = useNavigate();

    return (
        <Box> 
            <Flex>
                <VStack w="100%" overflow="auto" spacing={4} alignItems="start" mb={10}>
                    {posts.map((post) => (
                        <Box w="100%" key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
                            <BlogPost post={post} content={post.content} key={post}/>
                            <Divider/>
                        </Box>
                    ))}
                </VStack>
            </Flex>
        </Box>
    )
}