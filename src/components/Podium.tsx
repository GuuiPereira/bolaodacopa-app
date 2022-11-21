import { Button, HStack, Text, Avatar, VStack, Box } from 'native-base';

export interface RankingProps {
  participantId: string,
  points: number,
  name: string,
  avatarUrl: string,
};

interface Props {
  data: RankingProps;
  index: number
};

export function Podium({ data, index }: Props) {

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
      display='flex'
    >
      <HStack paddingX={4} w="full" justifyContent="space-between" alignItems="center">
        <Avatar
          key={data.participantId}
          source={{ uri: data.avatarUrl }}
          w={12}
          h={12}
          rounded="full"
          borderWidth={2}
          borderColor="gray.800"
        >
          {data.name}
        </Avatar>
        <HStack mt={4} flexDirection="column" alignItems="center">

          <Text color="white" fontSize="md" fontFamily="heading"> {data.name} </Text>
          <Text color="gray.400" fontSize="xs" fontFamily="body"> {`${data.points.toString()} ponto(s)`} </Text>
        </HStack>

        <Box rounded={50} background={ index < 2 ? "yellow.400" : "gray.600"} w={8} display="flex" justifyContent="center" alignItems="center" >
          <Text color={ index < 2 ? "black" : "gray.400"} fontSize="md" fontFamily="heading"> {`${index}°`}</Text>
        </Box>

      </HStack>

    </VStack>
  );
}