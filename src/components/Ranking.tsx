
import { useState, useEffect } from "react";
import { useToast, FlatList, Modal, ScrollView, VStack, HStack, Box } from 'native-base';
import { RankingProps, Podium } from '../components/Podium'

import { EmptyRakingList } from '../components/EmptyRakingList'

import { api } from '../services/api';
import { Loading } from "./Loading";
import { Guesses } from "./Guesses";
import { GuessesParticipant } from "./GuessesParticipant";
import { TouchableOpacity } from "react-native";

interface Props {
  poolId: string;
}

export function Ranking({ poolId }: Props) {

  const [isLoading, setIsLoading] = useState(true);
  const [partId, setPartId] = useState('');
  const [showModal, setShowModal] = useState(false);

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
    <>
      <FlatList
        data={ranking}
        keyExtractor={item => item.participantId}
       _contentContainerStyle={{pb: 48}}
        renderItem={({ item, index }) => (
          <TouchableOpacity

            onPress={() => {
              setPartId(item.participantId);
              setShowModal(true);
            }}
          >
            <Podium
              data={item}
              index={(index + 1)}
            ></Podium>
          </TouchableOpacity>
        )}
       
        ListEmptyComponent={() =>
          <EmptyRakingList />}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Palpites</Modal.Header>
          <Modal.Body>
              <GuessesParticipant
                participantId={partId}
              />
          </Modal.Body>
        </Modal.Content>
      </Modal>

    </>

  );
}
