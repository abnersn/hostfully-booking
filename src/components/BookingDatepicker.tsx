import { ReactElement, useState } from 'react'

import Datepicker from 'tailwind-datepicker-react'

interface IDatePickerProps {
  minDate: Date
  onChange: (date: Date) => void
}

export default function BookingDatepicker(
  props: IDatePickerProps
): ReactElement {
  const [show, setShow] = useState(false)
  return (
    <>
      <Datepicker
        show={show}
        setShow={setShow}
        onChange={props.onChange}
        options={{
          minDate: props.minDate,
          defaultDate: null
        }}
      />
    </>
  )
}
