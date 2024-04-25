import moment from 'moment'
import { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'
import { selectAllBookingsForProperty } from 'redux-store/slices/bookings'

interface IDatePickerProps {
  propertyId: string
  onChange: (startDate: Date | null, endDate: Date | null) => void
  startDate: Date | null
  endDate: Date | null
  minDate: Date
}

export default function BookingDatepicker(
  props: IDatePickerProps
): ReactElement {
  const bookings = useSelector(selectAllBookingsForProperty(props.propertyId))
  const handleChange = (value: DateValueType) => {
    let startDate = null
    let endDate = null
    if (value) {
      startDate = value.startDate ? moment(value.startDate).toDate() : null
      endDate = value.endDate ? moment(value.endDate).toDate() : null
    }
    props.onChange(startDate, endDate)
  }
  return (
    <Datepicker
      popoverDirection='up'
      placeholder='Select date'
      disabledDates={bookings}
      useRange={true}
      displayFormat='MMM DD, YYYY'
      value={{ startDate: props.startDate, endDate: props.endDate }}
      onChange={handleChange}
      minDate={props.minDate}
    />
  )
}
