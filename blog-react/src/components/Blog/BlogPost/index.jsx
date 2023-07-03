import { VStack, Box, Heading, Text, Center, Spacer } from '@chakra-ui/react'
import { Markdown } from '../Markdown'

export function BlogPost({ post: { id, title, date}, content}) {
    return (
        <Box pt={["2%", "10%", "10%", "8%" ,"5%"]} pb="5%">
            <Center w="100%">
                <Box w={["90%","80%"]}>
                    <VStack w="100%" overflowY="auto" overflowX="hidden" spacing={4} alignItems="start">

                        <Heading as="h1" size="xl">
                            {title}
                        </Heading>
                        <Text as='i'>
                            {new Date(date).toLocaleString()}
                        </Text>
                        <Spacer/>
                        <Markdown content={content}/>
                    </VStack>
                </Box>
            </Center>
        </Box>
    )
}

