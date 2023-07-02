import { Markdown } from "../Markdown";
import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function Synopsis({ content, id }) {

    const shortContent = content.split(" ").slice(0, 150).join(" ")+ "..."
    const router = useRouter()

    return (
        // Fade out on bottom
        <VStack alignItems={"start"} spacing={5} w="100%">
            <Markdown content={shortContent}/>
            <Button onClick={() => router.push(`/post/${id}`)}>Read More</Button>
        </VStack>
    )
}