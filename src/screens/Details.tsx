import { useEffect, useState } from "react";
import { Share } from "react-native";
import { HStack, Text, useToast, VStack } from "native-base";
import { useRoute, useNavigation } from '@react-navigation/native';
import { Header } from "../components/Header";
import { Guesses } from "../components/Guesses";
import { PoolPros } from "../components/PoolCard";
import { api } from '../services/api';
import { Loading } from "../components/Loading";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Ranking } from "../components/Ranking";

interface RouteParams {
  id: string
}

export function Details() {

  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');
  const [poolDetails, setPoolDetails] = useState<PoolPros>({} as PoolPros);

  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  async function handleCodeShare() {

    await Share.share({
      message: poolDetails.code
    })

  }

  async function fetchPoolDetails() {

    try {
      
      setIsLoading(true);
      const response = await api.get(`pools/${id}`);
      setPoolDetails(response.data.pool)

    } catch (err) {

      console.log(err);
      toast.show({
        title: 'Erro ao buscar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {

      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchPoolDetails();
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      ></Header>

      {
        poolDetails._count?.participants > 0 ?
          <VStack px={5} flex={1}>
            <PoolHeader data={poolDetails}></PoolHeader>

            <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
              <Option
                title="Seus palpites"
                isSelected={optionSelected === 'guesses'}
                onPress={() => setOptionSelected('guesses')}
              ></Option>
              <Option
                title="Ranking do grupo"
                isSelected={optionSelected === 'ranking'}
                onPress={() => setOptionSelected('ranking')}
              ></Option>
            </HStack>
            {
              optionSelected === 'guesses' ?
                <Guesses poolId={poolDetails.id} code={poolDetails.code} /> :
                <Ranking poolId={poolDetails.id}/>
            }
          </VStack>
          : <EmptyMyPoolList code={poolDetails.code}></EmptyMyPoolList>
      }

    </VStack>
  )
}