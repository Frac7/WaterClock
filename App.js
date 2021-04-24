import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import { Clock } from './components';
import { askPermissions } from './utils';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Clock />
      <StatusBar style="auto" />
    </ApplicationProvider>
  );
}
