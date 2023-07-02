import { Avatar, Box, Spacer, Stack, Text, useColorModeValue, Button, HStack, Card, CardBody, VStack } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

import { facebook_link, linkedin_link, github_link } from '../constants/strings';
import Newsletter from '../components/Newsletter'

export default function About() {
  return (
    <Box>
        <Stack
        bg={useColorModeValue('gray.50', 'gray.800')}
        py={16}
        px={8}
        spacing={{ base: 8, md: 10 }}
        align={'center'}
        direction={'column'}>
            <Spacer/>
    
            <Box textAlign={'center'}>
                <Avatar
                    src={'/headshot_2023.jpg'}
                    alt={'Maxwell Smith'}
                    mb={3}
                    size={'2xl'}
                    boxShadow={'2xl'}
                />

                <Text fontWeight={600} fontSize={'xl'}>Maxwell Smith</Text>
                <Text fontSize={'sm'} color={useColorModeValue('gray.400', 'gray.400')}>
                Software Developer/Freelance Consultant
                </Text>
            </Box>


            <Card boxShadow='2xl' w={["90%", "60%"]}>
                <CardBody>
                    <VStack spacing={10}>                   
                        <Text
                            fontSize={{ base: 'lg', md: '2xl' }}
                            textAlign={'center'}
                            maxW={'6xl'}>
                            Maxwell Smith is a Software Developer and Freelance Consultant based in Utah. Maxwell has experience in biotech, blockchain technology and is familiar with many development languages and frameworks, including Python, Express, Java, C, and deep learning models like CNNs or transformers. 
                        </Text>

                        <Text
                            fontSize={{ base: 'lg', md: '2xl' }}
                            textAlign={'center'}
                            maxW={'6xl'}>
                            He has been in the school full time for the last 3 years studying computer science, and is interested in artificial intelligence and machine learning. 
                        </Text>

                        <Text
                            fontSize={{ base: 'lg', md: '2xl' }}
                            textAlign={'center'}
                            maxW={'6xl'}>
                            In his free time, Maxwell enjoys visiting family, snowboarding, cycling, Indian food and video games. 
                        </Text> 
                    </VStack>  
                </CardBody>
            </Card>


            <Newsletter/>

            <HStack>
                <Button colorScheme='facebook' leftIcon={<FaFacebook />} onClick={() => window.open(facebook_link)}>
                    Facebook
                </Button>
                <Button colorScheme='linkedin' leftIcon={<FaLinkedin />} onClick={() => window.open(linkedin_link)}>
                    LinkedIn
                </Button>
                <Button backgroundColor={useColorModeValue("lightgray", null)} leftIcon={<FaGithub />} onClick={() => window.open(github_link)}>
                    Github
                </Button>
            </HStack>
        </Stack>

    </Box>
  );
}