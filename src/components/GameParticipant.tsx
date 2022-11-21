import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';
import { TeamParticipant } from './TeamParticipant';

interface GameInfo {
  gameId:string,
  firstTeamCountryCode: string,
  secondTeamCountryCode: string,
}

export interface GameParticipantProps {
  firstTeamPoints: number,
	secondTeamPoints: number,
  game:GameInfo
};

interface Props {
  data: GameParticipantProps;
};

export function GameParticipant({ data }: Props) {
  const { colors, sizes } = useTheme();

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      py={5}
      px={5}
    >
       <HStack mt={4} w="full" justifyContent="space-between" >
        <TeamParticipant
          code={data.game.firstTeamCountryCode}
          position="right"
          teamPoints={data.firstTeamPoints.toString()}
        />

        <X color={colors.gray[300]} style={{marginTop: 5}} size={sizes[6]} />

        <TeamParticipant
          code={data.game.secondTeamCountryCode}
          position="left"
          teamPoints={data.secondTeamPoints.toString()}
        />
      </HStack>

    </VStack>
  );
}