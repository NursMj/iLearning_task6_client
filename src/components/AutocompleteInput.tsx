import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

function AutocompleteInput({users, inputName, setSelected, selected}: any) {
  const options = users

  const handleInputChange = (event: any, newValue: any) => {
    event.preventDefault()
    setSelected(newValue)
  }

  const handleInputChangeText = (event: any) => {
    setSelected(event.target.value)
  }

  return (
    <div>
      <Autocomplete
        disableClearable
        freeSolo
        value={selected}
        onChange={handleInputChange}
        onInputChange={handleInputChangeText}
        options={options}
        renderInput={(params) => (
          <TextField 
            {...params} 
            placeholder={`Select or type ${inputName}`} 
          />
        )}
      />
    </div>
  )
}

export default AutocompleteInput