import React, { useState, useEffect} from 'react';
import { StyleSheet } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

import { Text, Box, View, useToast} from "native-base";
import { Header } from "../components/Header";
import Scanner from '../assets/scanner.svg';


export function Scan() {

  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const { navigate } = useNavigation();
  const toast = useToast();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
   
  }, [scanned]);

  const handleBarCodeScanned = async ({ type, data }) => {

    setScanned(true);

    try {

      await api.post('/pools/join', {
        data: {
          "code": data
        }
      });

      toast.show({
        title: 'Você entrou no bolão com sucesso.',
        placement: 'top',
        bgColor: 'green.500'
      });

      setScanned(false);
      navigate('pools');

    } catch (err) {

      setScanned(false);
      toast.show({
        title: err.response?.data?.message,
        placement: 'top',
        bgColor: 'green.500'
      });
   
      navigate('find');


    } 
  };

  return (
    <View flex={1}>
      <Header title="Ler Qrcode" showBackButton></Header>
      <View flex={1} alignItems="center" background="black" >
        <BarCodeScanner
          style={[StyleSheet.absoluteFillObject, styles.container]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        <Box flex={1} justifyContent="center" alignItems="center">
          <Scanner width={300} height={600} />
        </Box>
        <Text position="absolute" top={10} fontSize={16} color="white">{!hasPermission ? 'Sem permissão para acessar camera' : ''}</Text>

      </View>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0
  },

});