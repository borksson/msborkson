import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Code, Heading, Text, ListItem, UnorderedList, OrderedList, Wrap, VStack, WrapItem, Image, Center, Link, useColorModeValue } from "@chakra-ui/react";
import { ImageHolder } from "../ImageHolder";
import { useEffect } from "react";
// import { CodeBlock, CopyBlock } from "react-code-blocks";
import { useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";

export function Markdown({ content }) {
    const [renderedContent, setRenderedContent] = useState(<></>);

    useEffect(() => {
        setRenderedContent(
            <ReactMarkdown children={content} components={{
                h1: ({node, ...props}) => <Heading size="xl" {...props}/>,
                h2: ({node, ...props}) => <Heading size="xl" {...props}/>,
                h3: ({node, ...props}) => <Heading size="lg" {...props}/>,
                h4: ({node, ...props}) => <Heading size="lg" {...props}/>,
                p: ({node, ...props}) => <Text fontSize={"xl"} {...props}/>,
                ol: ({node, ...props}) => <OrderedList {...props}/>,
                li: ({node, ...props}) => <ListItem fontSize="xl" {...props}/>,
                img: ({node, ...props}) => <ImageHolder {...props}/>,
                code({node, ...props}) {
                    // If in pre tag, then we want to render code blocks
                    // Otherwise, we want to render inline code
                    const code = node.children[0].value;
                    console.log(props);
                    if(!props.inline) {
                        const language = props.className.split("-")[1];
                        // TODO: Code lines do not wrap
                        return <CodeBlock text={code} language={language} showLineNumbers={false} wrapLines={true} theme={useColorModeValue(null, dracula)} {...props}/>
                    } else {
                        return <code {...props}/>
                    }
                },
                ul({node, ...props}) {
                    let images = node.children.filter((child) => child.type === "element");
                    images = images.filter((ele) => ele.children[0].tagName === "img");
                    const image_elements = images.map((ele) => <WrapItem><Image rounded={'20'}
                    objectFit={'cover'}src={ele.children[0].properties.src} maxH={["100%","60"]} maxW={["100%", "80"]}/></WrapItem>);
                    if (images.length >= 1) {
                        return <Center w="100%">
                            <Wrap spacing={5} justify="center" align="center">
                                {image_elements}
                            </Wrap>
                        </Center>
                    } else {
                        return <UnorderedList {...props}/>
                    }
                },
                a: ({node, ...props}) => <Link color='teal.500' {...props}/>,
            }}/>
        )
    }, [content])

    return (
        <VStack spacing={5} alignItems="start" w="100%">
            {renderedContent}
        </VStack>
    )
}