import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useHistory, useParams} from 'react-router-dom';
import { Box, Stack, Text, Flex, Badge, useTheme } from '@chakra-ui/react';
import firebase from './firebase';

const db = firebase.firestore();

const GuidePage = () => {
  const history = useHistory();
  const theme = useTheme();
  const { unitId } = useParams();

  const [unitPassword, setUnitPassword] = useState({});

  useEffect(() => {
    const fetchUnitData = async () => {
      try {
        const data = await db.collection('passwords').doc(unitId).get();
        setUnitPassword(data.data());
        
      } catch (error) {
        console.log(error);
      }

    };

    fetchUnitData();
  }, [unitId]);

  const filterProperties = Object.keys(unitPassword).filter(pw => pw !== 'id');

  return (
    <Flex justify={{ base: 'center', md: 'space-around' }} align="center" flexWrap="wrap" p={4}>
      {filterProperties.map(pw => (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          w="300px"
          h="100px"
          key={pw}
          mt={{ base: '30px', md: '30px', lg: '0' }}
          boxShadow={`0.7rem 0.7rem ${theme.colors.blue[300]}`}
          cursor="pointer"
          onClick={() => history.push(`/guide/${unitId}/${pw}`)}
          css={css`
            &:hover {
              box-shadow: 0.7rem 0.7rem rgb(19, 86, 162);
            }
          `}
        >
          <Flex
            justify="flex-start"
            align="center"
            h="100%"
            p={2}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              width={70}
              height={70}
              border="1px solid"
              textAlign="center"
              lineHeight="100%"
              fontWeight="bold"
              flexGrow={0}
              flexShrink={0}
              bg="blue.300"
            >
              <Text fontWeight="bold">{unitPassword.id}</Text>
            </Box>
            <Box w="100%" d="flex" justifyContent="center" alignItems="center">
              <Stack spacing={2}>
                <Text fontSize="xl" fontWeight="bold">{pw}</Text>
                <Badge textAlign="center" fontSize="1em" variant="outline" colorScheme="blue">{unitPassword[pw]}</Badge>
              </Stack>
            </Box>
          </Flex>
        </Box>
      ))}
      
    </Flex>
  );
}

export default GuidePage;