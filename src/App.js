import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import { router } from 'lib/routes'

function App() {
  return (
    <div className='App'>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </div>
  )
}

export default App
