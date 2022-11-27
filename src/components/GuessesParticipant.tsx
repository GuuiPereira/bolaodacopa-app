
import React, { useState, useEffect, } from "react";
import { useToast, FlatList, Box, } from 'native-base';
import { GameParticipant, GameParticipantProps } from '../components/GameParticipant'

import { api } from '../services/api';
import { Loading } from "./Loading";

interface Props {
  participantId: string;
}

export function GuessesParticipant({ participantId }: Props) {

  const [isLoading, setIsLoading] = useState(true);
  const [guesses, setGuesses] = useState<GameParticipantProps[]>([]);
  const toast = useToast();

  async function fetchGamesParticipant() {

    try {
      setIsLoading(true)
      const response = await api.post(`/pools/gamesbyparticipant`, { participantId });
      setGuesses(response.data.guesses.guesses)

    } catch (err) {
      console.log(err);
      toast.show({
        title: 'Não foi possivel carregar os palpites desse participant',
        placement: 'top',
        bgColor: 'red.500'
      });

    } finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    fetchGamesParticipant();
  }, [participantId]);

  if (isLoading) {
    return (
      <Loading></Loading>
    )
  }

  return (
    <Box>
      {
        guesses.map((item) => <GameParticipant
          data={item}
          key={item.game.gameId}
        ></GameParticipant>)
      }
    </Box>
  );
}
