import { HStack, VStack } from 'native-base';
import CountryFlag from "react-native-country-flag";
import { Input } from './Input';
interface Props {
  code: string;
  position: 'left' | 'right';
  teamPoints: string;
}

export function TeamParticipant({ code, position,  teamPoints}: Props) {

  return (
    <HStack >
      {position === 'left' && <CountryFlag isoCode={code} size={25} style={{ marginTop: 6, marginRight: 12 }} />}
      <VStack>
        <Input
          w={10}
          h={9}
          textAlign="center"
          fontSize="xs"
          value={teamPoints}
          isReadOnly={true}
        />
      </VStack>

      {position === 'right' && <CountryFlag isoCode={code} size={25} style={{  marginTop: 6, marginLeft: 12 }} />}
    </HStack>
  );
}