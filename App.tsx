import { StatusBar } from 'expo-status-bar';

import { Test } from '@/app/Test';
import './src/styles/global.css'

export default function App() {
  return (
    <>
      <Test />
      <StatusBar style="auto" />
    </>
  );
}
