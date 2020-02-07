import * as React from 'react'
import { Button } from 'antd'

type ButtonProps = {
  text: string
  value: number
  addCity: (value: number) => void
  deleteCity: (value: number) => void
}

const FilterButton: React.SFC<ButtonProps> = ({text, value, addCity, deleteCity}) => {

  const [buttonClass, setButtonClass] = React.useState('filter-button')

  const handleButton = () => {
    if (buttonClass === 'filter-button'){
      setButtonClass('filter-button selected')
      addCity(value)
    } else {
      setButtonClass('filter-button')
      deleteCity(value)
    }
  }

  return (
    <Button className={buttonClass} onClick={handleButton} block size='large'>{text}</Button>
  )
}

export default FilterButton