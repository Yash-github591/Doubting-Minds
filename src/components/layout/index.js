import { Outlet } from 'react-router-dom'
import { useAuth } from 'hooks/auth'
import Navbar from './navbar'
import Sidebar from './sidebar'
import { Flex, Box } from '@chakra-ui/react'
import Loader from '../Loader'

export default function Layout() {
  const { isLoading } = useAuth()

  if (isLoading) return <Loader />

  return (
    <div>
      <Navbar />
      <Flex pb='12' mx='auto' w='full'>
        <Box>
          <Outlet />
        </Box>
      </Flex>
      <Sidebar />
    </div>
  )
}
