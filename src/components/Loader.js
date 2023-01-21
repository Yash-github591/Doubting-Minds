import { Spinner } from '@chakra-ui/react'

export default function Loader() {
  return (
    <div className='loader'>
      <Spinner
        thickness='3px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='md'
        margin='4px'
      />
    </div>
  )
}
