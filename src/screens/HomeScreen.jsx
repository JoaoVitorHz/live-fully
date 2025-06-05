import React, { useEffect, useState } from 'react';
import { Text, VStack } from 'native-base';
import { getManufacturer, getSystemVersion } from '../utils/deviceInfo';

export default function HomeScreen() {
  const [manufacturer, setManufacturer] = useState('');
  const [version, setVersion] = useState('');

  useEffect(() => {
    getManufacturer().then(setManufacturer);
    getSystemVersion().then(setVersion);
  }, []);

  return (
    <VStack space={2} p={4}>
      <Text>Fabricante: {manufacturer}</Text>
      <Text>Versão do Sistema: {version}</Text>
    </VStack>
  );
}