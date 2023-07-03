import { Box, Card, CardBody, CardHeader, CardFooter,Text } from "@chakra-ui/react";
import { Synopsis } from "../Synopsis";

export function BlogCard({ post: { id, type, title, contentURL, date}, content}) {
    
    return (
        <Box w={["100%", "80%"]}> {/*onClick={() => router.push(`/post/${id}`)} pt={10}>*/}
            <Card boxShadow='2xl'>
                <CardHeader fontSize={"5xl"} fontWeight={600}>{title} - {type.charAt(0).toUpperCase() + type.slice(1)}</CardHeader>
                <CardBody><Synopsis content={content} id={id}/></CardBody>
                <CardFooter><Text as='i' color="lightgray">{new Date(date).toLocaleString()}</Text></CardFooter>
            </Card>
        </Box>
    )
}