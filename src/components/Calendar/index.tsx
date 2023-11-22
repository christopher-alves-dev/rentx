import React from 'react';
import { Feather } from '@expo/vector-icons'
import { 
  Calendar as CustomCalendar,
  LocaleConfig,
  CalendarProps
} from 'react-native-calendars'

import { generateInterval } from './generateInterval'
import { useTheme } from 'styled-components';
import { ptBR } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  }
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

const Calendar = ({ markedDates, onDayPress }: CalendarProps) => {
  const theme = useTheme()
  return (
    <CustomCalendar
      renderArrow={(direction) => 
        <Feather 
          size={24}
          color={theme.colors.text}
          name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.backgroundSecondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.textDetail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={String(new Date())}
      markingType='period'
      markedDates={markedDates}
      onDayPress={onDayPress}
    >
    </CustomCalendar>
  )
}

export {
  Calendar,
  MarkedDateProps,
  DayProps,
  generateInterval
}