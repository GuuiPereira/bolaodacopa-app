import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';
import { countryNamesBR } from '../utils/countryList'

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';

import { Team } from './Team';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  firstTeamResult: number;
  secondTeamResult: number;
}

export interface GameProps {
  id: string;
  date:string,
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  firstTeamResult: number;
  secondTeamResult: number;
  weight: number;
  guess: null | GuessProps;
};

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
  firstTeamPoints:string;
  secondTeamPoints:string;
  firstTeamResult:string;
  secondTeamResult:string;
};

export function Game({ data, setFirstTeamPoints, setSecondTeamPoints, firstTeamPoints, secondTeamPoints, onGuessConfirm }: Props) {

  const { colors, sizes } = useTheme();
  const when = dayjs(data.date)
  .locale(ptBr)
  .format("DD [de] MMMM [de] YYYY [às] HH:00[h]")

  const getNameLocaleBR = (code:string)=>{

    return countryNamesBR[code] || '';

  }
  
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
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getNameLocaleBR(data.firstTeamCountryCode)   } vs. {getNameLocaleBR(data.secondTeamCountryCode)  }
      </Text>

      <Text color="gray.200" fontSize="xs">
        {when}
      </Text>

      <Text color="yellow.800"fontSize="sm">
        {`Peso: ${data.weight}`}
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" >
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
          teamPoints={data.guess?.firstTeamPoints.toString()}
          teamResult={data.firstTeamResult?.toString()}
          guessesId= {data.guess?.id}
        />

        <X color={colors.gray[300]} style={{marginTop: 5}} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
          teamPoints={data.guess?.secondTeamPoints.toString()}
          teamResult={data.secondTeamResult?.toString()}
          guessesId= {data.guess?.id}

        />
      </HStack>

      {
        !data.guess && !data.firstTeamResult &&
        <Button size="xs" w="full" bgColor="green.500" mt={4} onPress={onGuessConfirm}>
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      }
    </VStack>
  );
}