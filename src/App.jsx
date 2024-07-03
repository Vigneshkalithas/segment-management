import { useState } from 'react'
import './App.css'
import { MdArrowBackIos } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import Circle from "./Component/Circle"




function App() {
 const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const [segmentName, setSegmentName] = useState('');

  const handleInputChange = (event) => {
    setSegmentName(event.target.value);
};

const schemaOptions = [
  { label: 'First Name', value: 'first_name', traits:"user" },
  { label: 'Last Name', value: 'last_name', traits:"user" },
  { label: 'Gender', value: 'gender', traits:"user" },
  { label: 'Age', value: 'age', traits:"user" },
  { label: 'Account Name', value: 'account_name', traits:"group" },
  { label: 'City', value: 'city', traits:"group"},
  { label: 'State', value: 'state', traits:"group"}
];

const [selectedSchemas, setSelectedSchemas] = useState([]);
const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
const [currentSchema, setCurrentSchema] = useState('');
const [loading, setLoading] = useState(false)

  const handleSchemaChange = (e) => {
    console.log(e.target.value)
    setCurrentSchema(e.target.value);
  };
  // Add schema 
  const addSchema = () => {
    if (currentSchema) {
      const selectedOption = availableSchemas.find(option => option.value === currentSchema); // find the currentSchema Object
      setSelectedSchemas([...selectedSchemas, selectedOption]);                                // Add that schemas in selected list
      setAvailableSchemas(availableSchemas.filter(option => option.value !== currentSchema));  // Remove that object in all schemas 
      setCurrentSchema('');       // setCurrentSchemas for empty
    }
  };
  // Remove Schema 
  const removeSchema = (value) => {
    const removedSchema = selectedSchemas.find(schema => schema.value === value);  // Finding Schema which want to be delete 
    setSelectedSchemas(selectedSchemas.filter(schema => schema.value !== value));   // Remove the Schema i selectedSchmas 
    setAvailableSchemas([...availableSchemas, removedSchema]);                       // Add back to available Schemas
  };
    // save and send data to server 
  const saveSegment = () => {
    // condition for name (required)
if (!segmentName) {
      alert('Please fill the segment name field.');
      return;
    }
    // condition for schmas (required)
    if (selectedSchemas.length === 0) {
      alert('Please add at least one schema.');
      return;
    }
  
  const segmentData = {
  segment_name: segmentName,
  schema: selectedSchemas.map(schema => ({
    [schema.value]: schema.label
  }))
};
  console.log('Segment Data:', segmentData);
   setLoading(true)
     fetch('/api/2febd075-0ef6-4bae-8d28-11d5ca8020f3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(segmentData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
       setLoading(false)
    })
    .catch((error) => {
      console.error('Error:', error);
       setLoading(false)
    });
  
  };

  return (
   <div className="App">
      <button className={"saveSegementBtn"} onClick={toggleDrawer}>
        Save segment
      </button>
      <div className={`overlay ${isDrawerOpen ? 'open' : ''}`} onClick={toggleDrawer}></div>
      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>      
        {/* Header */}
    <div className={'containerHeader'}>
    <button className={'CloseBtn'} onClick={()=> setIsDrawerOpen(false)}>
    <MdArrowBackIos color='White' size={20} />
     Saving Segment
    </button>
    </div>

        {/* Content  */}
     <div className={'contentContainer'}>
      <form className='fromHead'>
        <label className={'label'} htmlFor="segmentName">Enter the Name of the Segment</label>
        <input
          type="text"
          id="segmentName"
          className={'inputBox'}
          value={segmentName}
          onChange={handleInputChange}
          placeholder='Name of the segment'
        />
      </form>
      <div style={{padding:"15px 0 0 7px"}}>
      <p className={'label'}>To save your segment, you need to add the schemas to build the query</p>
      </div>
      <div className='statusHead'>
       <div className='statusInSideHead'>
       <Circle bG={"#68d986"}/>
       <div>-User Traits</div>
      </div>
      <div className='statusInSideHead'>
       <Circle bG={"#d24572"}/>
       <div>-Group Traits</div>
      </div>
      </div>     
      <div>

       <div className="selected-schemas">
            {selectedSchemas.map((schema, index) => (
              <div key={index} className="dropdownHead">
                <Circle bG={schema.traits ==="user" ? "#68d986" : "#d24572"}/>
                <select className="Dropdown my-2" value={schema.value} onChange={(e) => {
                  const newValue = e.target.value;
                  const newLabel = schemaOptions.find(option => option.value === newValue).label;
                  const newTraits = schemaOptions.find(option => option.value === newValue).traits;
                  const newSelectedSchemas = [...selectedSchemas];
                  newSelectedSchemas[index] = { label: newLabel, value: newValue, traits:newTraits };
                  setSelectedSchemas(newSelectedSchemas);
                  setAvailableSchemas(schemaOptions.filter(option => !newSelectedSchemas.some(s => s.value === option.value)));
                }}>
                  {schemaOptions.filter(option => option.value === schema.value || !selectedSchemas.some(s => s.value === option.value)).map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <button className="removeBtn" onClick={() => removeSchema(schema.value)}>
                <FaMinus size={23}/>
                </button>
              </div>
            ))}
         </div>

       < div className='dropdownHead'>
            <Circle bG={"#e3e4e6"}/>
            <select  className={'Dropdown'} value={currentSchema} onChange={handleSchemaChange}>
              <option value="" disabled>Add Schema to segment</option>
              {availableSchemas.map(schema => (
                <option key={schema.value} value={schema.value}>{schema.label}</option>
              ))}
            </select>
          </div>
           <button className="btn btn-link" id='addBtn' onClick={addSchema}>+Add new schema</button>
      </div>
    </div>
        {/* Footer   */}
      <div className='footerHead'>
        { loading ?
        <button className='saveBtn' onClick={saveSegment}>
       <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
       <span className="sr-only">Sending...</span> 
      </button> :
      <button className='saveBtn' onClick={saveSegment}> 
      Save the segment 
      </button>
}
      <button className='cancelBtn' onClick={()=> setIsDrawerOpen(false)} >cancel</button>
    </div>
    </div>
    </div>
  )
}

export default App
