
import { useState, useEffect } from "react";
import { useToast, FlatList } from 'native-base';
import { RankingProps, Podium } from '../components/Podium'

import { EmptyRakingList } from '../components/EmptyRakingList'

import { api } from '../services/api';
import { Loading } from "./Loading";

interface Props {
  poolId: string;
}

export function Ranking({ poolId }: Props) {

  const [isLoading, setIsLoading] = useState(true);
  const [ranking, setRanking] = useState<RankingProps[]>([]);

  const toast = useToast();

  async function fetchRanking() {

    try {

      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/ranking`);
      setRanking(response.data.ranking)

    } catch (err) {
      console.log(err);
      toast.show({
        title: 'Não foi possivel carregar o ranking',
        placement: 'top',
        bgColor: 'red.500'
      });

    } finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    fetchRanking();
  }, [poolId]);

  if (isLoading) {
    return (
      <Loading></Loading>
    )
  }

  return (
    <FlatList
      data={ranking}
      keyExtractor={item => item.participantId}
      renderItem={({ item, index }) => (
        <Podium
          data={item}
          index={(index + 1)}
        ></Podium>
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() =>
        <EmptyRakingList />}
    />

  );
}
