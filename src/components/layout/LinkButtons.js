import { Flex, Image, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { PROTECTED } from 'lib/routes'

export default function LinkButtons() {
  return (
    <div>
      <Stack direction='column' mt='10px'>
        <Flex>
          <Link to={`${PROTECTED}/subjects/physics`}>
            <Image
              borderRadius='10'
              m='6px'
              objectFit='cover'
              _hover={{ cursor: 'pointer', opacity: '0.4' }}
              src={process.env.pic1Link}
            />
          </Link>
          <Link to={`${PROTECTED}/subjects/chemistry`}>
            <Image
              borderRadius='10'
              m='6px'
              objectFit='cover'
              _hover={{ cursor: 'pointer', opacity: '0.4' }}
              src={process.env.pic2Link}
            />
          </Link>
        </Flex>
        <Flex>
          <Link to={`${PROTECTED}/subjects/maths`}>
            <Image
              borderRadius='10'
              m='6px'
              objectFit='cover'
              _hover={{ cursor: 'pointer', opacity: '0.4' }}
              src={process.env.pic3Link}
            />
          </Link>
          <Link to={`${PROTECTED}/subjects/biology`}>
            <Image
              borderRadius='10'
              m='6px'
              objectFit='cover'
              _hover={{ cursor: 'pointer', opacity: '0.4' }}
              src={process.env.pic4Link}
            />
          </Link>
        </Flex>
        <Flex justifyContent='center'>
          <Link to={`${PROTECTED}/subjects/General`}>
            <Image
              borderRadius='10'
              m='6px'
              _hover={{ cursor: 'pointer', opacity: '0.4' }}
              src={process.env.pic5Link}
            />
          </Link>
        </Flex>
      </Stack>
    </div>
  )
}
