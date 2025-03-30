import { DefaultTheme } from 'styled-components';

// Export your own Theme type (which is the same as DefaultTheme in this case)
export type Theme = DefaultTheme;

export const lightTheme: DefaultTheme = {
  background: 'white',
  color: 'black',
};

export const darkTheme: DefaultTheme = {
  background: 'black',
  color: 'white',
};