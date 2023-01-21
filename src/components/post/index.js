import { Text, Box, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { PROTECTED } from 'lib/routes'
import { useLocation } from 'react-router-dom'
import Actions from './actions'
import Header from './header'

export default function Post({
  post,
  ImageDisplay = 'false',
  needWhiteSpace = 'false',
}) {
  const { pathname } = useLocation()
  const { id, text, img } = post
  return (
    <Box p='2' maxW='600px' textAlign='left'>
      <Box
        border='2px solid'
        borderColor='gray.100'
        borderRadius='16'
        _hover={
          (pathname.startsWith('/protected/dashboard') ||
            pathname.startsWith('/protected/subjects') ||
            pathname.startsWith('/protected/profile')) && {
            boxShadow: 'dark-lg',
          }
        }
      >
        <Header post={post} />
        {pathname.startsWith('/protected/comments') && (
          <Box p='2' minH='100px'>
            <Text wordBreak='break-word' fontSize='md'>
              {needWhiteSpace === 'true' && (
                <Text whiteSpace='pre-wrap'> {text} </Text>
              )}

              {needWhiteSpace === 'false' && <Text> {text} </Text>}
              {ImageDisplay === 'true' && img && <Image src={img} />}
            </Text>
          </Box>
        )}

        {(pathname.startsWith('/protected/dashboard') ||
          pathname.startsWith('/protected/subjects') ||
          pathname.startsWith('/protected/profile')) && (
          <Link to={`${PROTECTED}/comments/${id}`}>
            <Box
              p='2'
              minH='100px'
              _hover={{ cursor: 'pointer', opacity: '0.4' }}
            >
              <Text wordBreak='break-word' fontSize='md'>
                {needWhiteSpace === 'true' && (
                  <Text whiteSpace='pre-wrap'> {text} </Text>
                )}

                {needWhiteSpace === 'false' && <Text> {text} </Text>}
                {ImageDisplay === 'true' && img && <Image src={img} />}
              </Text>
            </Box>
          </Link>
        )}
        <Actions post={post} />
      </Box>
    </Box>
  )
}
