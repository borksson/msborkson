import { Flex, VStack, Box, Card, CardBody} from '@chakra-ui/react'
import { BlogCard } from '../components/Blog/BlogCard'
import { useState, useEffect } from 'react'

export default function Home() {
  const [ posts, setPosts ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const blogRes = await fetch(`https://api.msborkson.com/api/posts/blog`)
      const blogPosts = await blogRes.json()
      const techRes = await fetch(`https://api.msborkson.com/api/posts/tech`)
      const techPosts = await techRes.json()
      const posts = blogPosts.concat(techPosts)
    
      for (let i = 0; i < posts.length; i++) {
          const contentRes = await fetch(`https://api.msborkson.com${posts[i].contentURL}`)
          const content = await contentRes.text()
          posts[i].content = content
      }

      // Order by date
      posts.sort((a, b) => {
          return new Date(b.date) - new Date(a.date)
      })
      setPosts(posts)
    }
    fetchData()
  }, [])



  return (
  <Box p={4}>
    <Flex pt={[20, 10]}>
      <VStack w="100%" overflowY="auto" overflowX="hidden" spacing={4}>
        <Card mt={10} display={{ base: 'flex', md: 'none' }} onClick={() => window.location.href = "/about"}>
          <CardBody fontSize={"lg"} fontWeight={600}>About Page</CardBody>
        </Card>
        {posts.map((post) => (
          <BlogCard post={post} content={post.content} key={post.id}/>
        ))}
      </VStack>
    </Flex>
  </Box>
  )
}