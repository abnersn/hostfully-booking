import { ReactElement } from 'react'

import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'

interface IDatePickerProps {
  onChange: (date: DateValueType) => void
  value: DateValueType
}

export default function BookingDatepicker(
  props: IDatePickerProps
): ReactElement {
  return (
    <Datepicker
      popoverDirection='up'
      placeholder='Select date'
      asSingle={true}
      useRange={false}
      value={props.value}
      onChange={props.onChange}
    />
  )
}
