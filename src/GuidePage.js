import React, { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import { Box, Stack, Text, Flex, Badge } from '@chakra-ui/react';
import firebase from './firebase';

const db = firebase.firestore();

const GuidePage = () => {
  const history = useHistory();
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
    <Flex justify="center" align="center" p={4}>
      <Flex flexWrap="wrap" w="80%">
        {filterProperties.map(pw => (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="xl"
            w="300px"
            h="100px"
            key={pw}
            mt={{ base: '20px', md: '0' }}
            cursor="pointer"
            onClick={() => history.push(`/guide/${unitId}/${pw}`)}
          >
            <Flex justify="flex-start" align="center" h="100%" p={2}>
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
                color="gray.500"
                flexGrow={0}
                flexShrink={0}
                bg="blue.100"
              >
                {unitPassword.id}
              </Box>
              <Stack spacing={2} ml={10}>
                <Text fontSize="xl" fontWeight="bold">{pw}</Text>
                <Badge fontSize="1em" variant="outline" colorScheme="blue">{unitPassword[pw]}</Badge>
              </Stack>
            </Flex>
          </Box>
        ))}
        
      </Flex>
    </Flex>
  );
}

export default GuidePage;