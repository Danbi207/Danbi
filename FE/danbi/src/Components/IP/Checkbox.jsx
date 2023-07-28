// import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

const Checkbox = () => {
  const checkList = ['동성이였으면 좋겠어요', '비대면으로 해결할 수 있어요', '대면으로 해결할 수 있어요'];

//   const CheckBoxes = () => {
//     const [checkedList, setCheckedList] = useState([]);
//     const [isChecked, setIsChecked] = useState(false);
  
//     const checkedItemHandler = (value, isChecked) => {
//       if (isChecked) {
//         setCheckedList((prev) => [...prev, value]);
  
//         return;
//       }
  
//       if (!isChecked && checkedList.includes(value)) {
//         setCheckedList(checkedList.filter((item) => item !== value));
  
//         return;
//       }
  
//       return;
//     };
  
//     const checkHandler = (e, value) => {
//       setIsChecked(!isChecked);
//       checkedItemHandler(value, e.target.checked);
  
//       console.log(value, e.target.checked);
//     };
  
//     const onSubmit = useCallback(
//       (e) => {
//         e.preventDefault();
  
//         console.log('checkedList:', checkedList);
//       },
//       [checkedList]
//     );
//     }

  return (
    <>    
    <PresetName>선택사항</PresetName>
    <Wrap>
        <CheckBoxForm>
            <input type='checkbox'></input>
            <label>{checkList[0]}</label><br/>
            <input type='checkbox'></input>
            <label>{checkList[1]}</label><br/>
            <input type='checkbox'></input>
            <label>{checkList[1]}</label>
        </CheckBoxForm>
    </Wrap>
    </>
  )
}

const Wrap = styled.div `
    line-height: 2rem;
`
const PresetName = styled.div `
    height: 1rem;
    font-size: 1rem;
    text-align: left;
    margin-left: 1rem;
    margin-top: 1rem;
`

const CheckBoxForm = styled.form`
    margin-left: 1rem;
    margin-top: 0.5rem ;
` 

export default Checkbox;