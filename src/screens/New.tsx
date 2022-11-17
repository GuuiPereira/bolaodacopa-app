import { useState } from 'react';
import { Heading, Text, VStack, useToast } from "native-base";
import Logo from '../assets/logo.svg';
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from '../services/api';

export function New() {

  const [poolName, setPoolName] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast();

  async function handlePoolCreate() {

    if (!poolName.trim()) {

      return toast.show({
        title: 'Informe um nome para o seu bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    try {

      await api.post('/pools', { title: poolName });
      toast.show({
        title: 'Bolão criado com sucesso.',
        placement: 'top',
        bgColor: 'green.500'
      });
      setPoolName('');

    } catch (err) {

      console.log(err);
      toast.show({
        title: 'Não foi possível criar o bolão.',
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {

      setIsLoading(false);

    }

  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão"></Header>
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolão?"
          onChangeText={setPoolName}
          value={poolName}
        ></Input>

        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        ></Button>
        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4} >
          Após criar seu bolão, você receberá um código único que podera convidar outras pessoas.
        </Text>

      </VStack>
    </VStack>
  )
}