import React , {useState} from 'react'
import './todo.css'
import {FiPlus , FiEdit , FiTrash2} from 'react-icons/fi'
const Todoadvance = () => {

  const [InputData , setInputData] = useState("");
  const [DataList , setDataList] = useState([]); 
  const [Updated , setUpdated] = useState(true);
  const [EditId , setEditId] = useState(null)


  const handleInput = (e)=>{
    setInputData(e.target.value)
  }

  const handleAdd =()=> {
      if(!InputData){
        alert("please add item")
      }else if(InputData && !Updated){
          const UpdatedData = DataList.map((val)=>{
            if(val.id === EditId){
              return {...val , name : InputData}
            }
            return val
          })

          setDataList(UpdatedData);
          setUpdated(true);
          setInputData("")
          setEditId(null)

      }else{
        const allData = {id : new Date().getTime().toString() , name : InputData}
        setDataList([...DataList , allData]);
        setInputData("")
      }
  }

  const handleEdit = (id)=>{
    const EditData = DataList.find((val)=>{
      return val.id === id
    })
    setInputData(EditData.name);
    setEditId(id)
    setUpdated(false)
  }

  const handleDelete = (id)=>{
      const DeltedData = DataList.filter((val)=>{
        return val.id !== id
      })
        setDataList(DeltedData)
    }

  return (
    <div className='Main_Todo'>
      <div className='inner_Todo'>
        <div className='heading'>
        <h1>Todo</h1>
        </div>
        <div className='Input_Item'>
          <input type="text" onChange={handleInput} value ={InputData}  placeholder='Add Item' />
          {
            Updated ?
            <button onClick={handleAdd} ><FiPlus/></button>
            :
             <button id = "editBtn" onClick = {handleAdd} ><FiEdit/></button>

          }
        </div>
        <div className='List_Item'>
          {
DataList.map((val)=>{
        return(
           <div key={val.id} className='inner_ListItem' >
            <h1>{val.name}</h1>
            <div>
              <button id='editBtn' onClick={()=>handleEdit(val.id)} ><FiEdit/></button>
              <button onClick={()=>handleDelete(val.id)} ><FiTrash2/></button>
            </div>

          </div>
           )
          })
                  }

        </div>

      </div>
    </div>
  )
}

export default Todoadvance