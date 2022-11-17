import { useState } from "react";
import { Heading, Text, useToast, VStack } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from '../services/api';

export function Find() {

  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const toast = useToast();

  async function handleJoinPool() {

    if (!code.trim()) {

      return toast.show({
        title: 'Informe um código para buscar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    try {

      await api.post('/pools/join', { data: {code} });

      toast.show({
        title: 'Você entrou no bolão com sucesso.',
        placement: 'top',
        bgColor: 'green.500'
      });

      navigate('pools')

    } catch (err) {

      console.log(err);
      toast.show({
        title: err.response?.data?.message,
        placement: 'top',
        bgColor: 'red.500'
      });
      setIsLoading(false);

    }

  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton></Header>
      <VStack mt={8} mx={5} alignItems="center">

        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através do seu código único ou lendo o QRCode
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        ></Input>

        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        ></Button>
        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} my={4} >
          Ou
        </Text>

        <Button
          title="LEIA O QR CODE"
          type="SECONDARY"
          onPress={() => { navigate('scan'); }}
        ></Button>
      </VStack>
    </VStack>
  )
}