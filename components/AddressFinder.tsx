import * as React from 'react'
import DaumPostcode, {AddressData} from 'react-daum-postcode'

type Props = {
  handleCancel: Function
  handleAddress: Function
}

const AddressFinder: React.SFC<Props> = ({handleCancel, handleAddress})=> {

  const onComplete = (data: AddressData) => {
    let fulladdress = data.address;
    let zonecode = data.zonecode;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      extraAddress = extraAddress !== '' ? `(${extraAddress})` : '';
    }
    
    handleAddress(zonecode, fulladdress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    handleCancel()
  }

  return (
    <div className='address-finder'>
      <DaumPostcode
        onComplete={onComplete}
        animation
      />
    </div>
  )
}

export default AddressFinder