import { Center, Icon, Text } from 'native-base'
import Logo from '../assets/logo.svg'
import { Button } from '../components/Button'
import { Fontisto } from '@expo/vector-icons'
import { useAuth } from '../hooks/useAuth'
import { Alert } from '../components/Alert'
import { useEffect, useState } from 'react'

export function SignIn() {

  const { signIn, isUserLoading, user } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  async function trySignIn() {
    try {

      setErrorMessage('');
      await signIn();

    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  return (
    <Center flex={1} bgColor="gray.900" padding={7}>
      <Logo width={212} height={40} />
      <Button
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md"></Icon>}
        title="Entrar com google"
        type="SECONDARY"
        mt={12}
        onPress={trySignIn}
        isLoading={isUserLoading}
        _loading={{
          _spinner: { color: 'white' }
        }}
      >
      </Button>
      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além do seu e-mail para criação da sua conta.
      </Text>

      {errorMessage && (
        <Alert msg={errorMessage} title="Erro" type='error'></Alert>
      )}

    </Center>
  )
}