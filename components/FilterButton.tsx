import * as React from 'react'
import { Button } from 'antd'

type ButtonProps = {
  text: string
  value: number
  add: (value: number) => void
  remove: (value: number) => void
}

const FilterButton: React.SFC<ButtonProps> = ({text, value, add, remove}) => {

  const [buttonClass, setButtonClass] = React.useState('filter-button')

  const handleButton = () => {
    if (buttonClass === 'filter-button'){
      setButtonClass('filter-button selected')
      add(value)
    } else {
      setButtonClass('filter-button')
      remove(value)
    }
  }

  return (
    <Button className={buttonClass} onClick={handleButton} block size='large'>{text}</Button>
  )
}

export default FilterButton