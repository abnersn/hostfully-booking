import moment from 'moment'
import { ReactElement } from 'react'

import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'

interface IDatePickerProps {
  onChange: (date: Date | null) => void
  value: Date | null
  minDate: Date
}

export default function BookingDatepicker(
  props: IDatePickerProps
): ReactElement {
  const handleChange = (value: DateValueType) => {
    let dateValue = null
    if (moment(value?.startDate).isValid()) {
      dateValue = moment(value?.startDate).toDate()
    }
    props.onChange(dateValue)
  }
  return (
    <Datepicker
      popoverDirection='up'
      placeholder='Select date'
      asSingle={true}
      useRange={false}
      displayFormat='MMM DD, YYYY'
      value={{ startDate: props.value, endDate: props.value }}
      onChange={handleChange}
      minDate={props.minDate}
    />
  )
}
