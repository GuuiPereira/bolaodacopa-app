import { HStack } from 'native-base';
import { useState } from 'react';
import CountryFlag from "react-native-country-flag";

import { Input } from './Input';

interface Props {
  code: string;
  position: 'left' | 'right';
  teamPoints: string;
  guessesId: string;
  onChangeText: (value: string) => void;
}

export function Team({ code, position, onChangeText, teamPoints, guessesId }: Props) {

  return (
    <HStack alignItems="center">
      {position === 'left' && <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />}

      <Input
        w={10}
        h={9}
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        onChangeText={onChangeText}
        value={teamPoints}
        isReadOnly={!!guessesId}
      />

      {position === 'right' && <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />}
    </HStack>
  );
}