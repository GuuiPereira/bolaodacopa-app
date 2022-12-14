import { HStack, VStack } from 'native-base';
import CountryFlag from "react-native-country-flag";
import { Input } from './Input';
interface Props {
  code: string;
  position: 'left' | 'right';
  teamPoints: string;
  teamResult: string;
  guessesId: string;
  onChangeText: (value: string) => void;
}

export function Team({ code, position, onChangeText, teamPoints, teamResult, guessesId }: Props) {

  return (
    <HStack >
      {position === 'left' && <CountryFlag isoCode={code} size={25} style={{ marginTop: 6, marginRight: 12 }} />}
      <VStack>
        <Input
          w={14}
          h={9}
          textAlign="center"
          fontSize="xs"
          keyboardType='number-pad'
          onChangeText={onChangeText}
          value={teamPoints}
          isReadOnly={!!guessesId}
        />

        {
          teamResult && <Input
            w={14}
            h={9}
            mt={1}
            bg={"gray.100"}
            color={"black"}
            textAlign="center"
            fontSize="xs"
            value={teamResult}
            isReadOnly={true}
          />
        }

      </VStack>

      {position === 'right' && <CountryFlag isoCode={code} size={25} style={{  marginTop: 6, marginLeft: 12 }} />}
    </HStack>
  );
}