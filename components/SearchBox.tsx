import * as React from 'react'
import { Input } from 'antd'
import '@assets/SearchBox.less'

type Props = {
  searchText: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}
const SearchBox: React.SFC<Props> = ({searchText, handleSearch, placeholder}) => {
  return (
    <div className='search-bar'>
      <Input.Search value={searchText} onChange={handleSearch} placeholder={placeholder}/>
    </div>
  )
}

export default SearchBox