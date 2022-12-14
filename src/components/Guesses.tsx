
import React, { useState, useEffect } from "react";
import { useToast, FlatList, HStack, View, Text } from 'native-base';
import { Game, GameProps } from '../components/Game'
import { EmptyMyPoolList } from '../components/EmptyMyPoolList'
import { api } from '../services/api';
import { Loading } from "./Loading";
interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {

  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);

  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');

  const toast = useToast();

  async function fetchGames() {

    try {

      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games)

    } catch (err) {
      console.log(err);
      toast.show({
        title: 'Não foi possivel carregar os jogos',
        placement: 'top',
        bgColor: 'red.500'
      });

    } finally {
      setIsLoading(false);
    }

  }

  async function handleGuessConfirm(gameId: string) {

    try {

      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Informe o placar do palpite para continuar',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      setIsLoading(true);

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

      toast.show({
        title: 'Palpite realizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      });

      fetchGames();

    } catch (err) {
      console.log(err);
      toast.show({
        title: err.response?.data?.message,
        placement: 'top',
        bgColor: 'red.500'
      });

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if (isLoading) {
    return (
      <Loading></Loading>
    )
  }

  return (
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        display={'flex'}
        _contentContainerStyle={{ pb: 48 }}
        renderItem={({ item }) => (
          <Game
            data={item}
            setFirstTeamPoints={setFirstTeamPoints}
            setSecondTeamPoints={setSecondTeamPoints}
            firstTeamPoints={firstTeamPoints}
            secondTeamPoints={secondTeamPoints}
            firstTeamResult={item?.firstTeamResult?.toString()}
            secondTeamResult={item?.secondTeamResult?.toString()}
            onGuessConfirm={() => { handleGuessConfirm(item.id) }}

          ></Game>
        )}
        ListEmptyComponent={() =>
          <EmptyMyPoolList
            code={code}
          ></EmptyMyPoolList>}
      />
  );
}
