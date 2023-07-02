import { Flex, VStack, Box, Heading, Text, Center, Spacer, Mark} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { Markdown } from '../Markdown'
import { useState } from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Arrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className + " custom-arrow"}
        style={{ ...style, display: "block"}}
        onClick={onClick}
        />
    );
}


export function BlogPost({ post: { id, title, date}, content}) {
    const router = useRouter();

    const settings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />
    };

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
                        {/* <ReactMarkdown children={content} 
                        components={{
                            img: ({node, ...props}) => ( <div className="single-image-container"><img {...props} className="single-image"/></div> ),
                            ul({node, ...props}) {
                                let images = node.children.filter((child) => child.type === "element");
                                console.log(images);
                                images = images.filter((ele) => ele.children[0].tagName === "img");
                                const image_elements = images.map((ele) => <div className="slider-image-container"><img src={ele.children[0].properties.src} className="slider-image"/></div>);
                                if (images.length >= 1) {
                                    return <div className="slider-container">
                                        <Slider {...settings}>{image_elements}</Slider>
                                    </div> 
                                } else {
                                    return <ul {...props} className="list"/>
                                }
                            },
                        }}
                        /> */}
                    </VStack>
                </Box>
            </Center>
        </Box>
    )
}

