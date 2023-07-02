import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import theme from '../constants/theme'
import Head from 'next/head'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={theme}>
    <Head>
      <title>Maxwell Smith - Blog</title>
      <link rel="icon" href="/m-black-icon.png" />
      <meta name="viewport" content="width=device-width, initial-scale = 0.83, maximum-scale=4.0, minimum-scale=0.81"></meta>
    </Head>

    <Navbar/>

    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
