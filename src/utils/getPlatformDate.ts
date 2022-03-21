import { addDays } from "date-fns"
import { Platform } from "react-native"


export const getPlatformDate = (date: Date) => {
  if(Platform.OS === 'ios') { //Ao selecionar a data com iphone, ele está retornando sempre um dia antes, ao invés do selecionado, por isso adicionamos 1 dia para iphone;
    return addDays(date, 1);
  } else {
    return date;
  }
};
