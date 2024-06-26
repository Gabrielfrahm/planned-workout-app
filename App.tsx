import './src/styles/global.css'
import { StatusBar } from 'expo-status-bar';

import { Test } from '@/app/Test';


export default function App() {
  return (
    <>
      <Test />
      <StatusBar style="auto" />
    </>
  );
}
