import React from 'react'
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment'
import 'moment/locale/fr'
import 'react-day-picker/lib/style.css';

const DayPickerCustom = ({ onDateSelect=f=>f,onDaySelect=f=>f,...props}) => {

    const { selectedDay,locale } = props 

    const handleDayClick = (day) => {
        onDateSelect(day)
    } 
    return (<div>
        
            <DayPicker selectedDays={selectedDay} onDayClick={handleDayClick}  localeUtils={MomentLocaleUtils} locale={locale}/>
                    <p>
          {/*selectedDay
            ? selectedDay.toLocaleDateString()
          : 'Choisissez un jour'*/}
        </p></div>
    )
}

export default DayPickerCustom