import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;

  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;

  margin-right: 2px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.colors.backgroundSecondary};

  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-color: ${theme.colors.main};
  `};
`;

export const InputText = styled(BottomSheetTextInput) <Props>`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;

  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.colors.backgroundSecondary};
  
  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-color: ${theme.colors.main};
  `};
`;
