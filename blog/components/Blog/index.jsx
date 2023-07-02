import { Box, Divider, Flex, VStack } from "@chakra-ui/react";
import { BlogPost } from "../../components/Blog/BlogPost";
import { useRouter } from "next/router";

export default function Blog({ posts }) {
    const router = useRouter();

    return (
        <Box> 
            <Flex>
                <VStack w="100%" overflow="auto" spacing={4} alignItems="start" mb={10}>
                    {posts.map((post) => (
                        <Box w="100%" key={post.id} onClick={() => router.push(`/post/${post.id}`)}>
                            <BlogPost post={post} content={post.content} key={post}/>
                            <Divider/>
                        </Box>
                    ))}
                </VStack>
            </Flex>
        </Box>
    )
}