import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Logo } from '../Logo';

const Links = [{title: 'Tech Blog', href:"tech"},  {title: 'Blog', href:"blog"}, {title: 'About', href:"about"}];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'/'+children.href}
    fontSize={"20px"}
    fontWeight={600}
    >
    {children.title}
  </Link>
);

export default function Simple() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} w="100%" position="fixed" zIndex={1} boxShadow='md'>
        <Flex h={[20, 16]} alignItems={'center'} justifyContent={'space-between'}>
            <HStack alignItems={'center'}>
                <Box>
                    <Logo />
                </Box>
                <HStack
                    as={'nav'}
                    spacing={4}
                    display={{ base: 'none', md: 'flex' }}>
                    {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                    ))}
                </HStack>
            </HStack>

            <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
        </Flex>
      </Box>
    </>
  );
}