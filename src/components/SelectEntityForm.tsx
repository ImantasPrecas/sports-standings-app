import { Button } from './ui/Button'
import { SelectEntity } from './ui/SelectEntity'

export const SelectEntityForm = ({
  options,
  value,
  onSelect,
  handleAddNewTeam,
  resetInputs,
  error,
  setIsAddingTeam,
}: {
  options: { id: string; name: string }[]
  value: string
  onSelect: (selectedOption: string) => void
  handleAddNewTeam: () => void
  resetInputs: () => void
  error: string | null
  setIsAddingTeam: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className='flex-col gap-2 w-full'>
      <div className='flex gap-2'>
        <SelectEntity
          size='sm'
          placeholder='Select team'
          options={options}
          value={value}
          onSelect={onSelect}
        />
        <Button
          variant='secondary'
          size='sm'
          className='w-auto'
          onClick={handleAddNewTeam}
        >
          Add
        </Button>
        <Button
          variant='secondary'
          size='sm'
          className='w-auto'
          onClick={() => {
            setIsAddingTeam(false)
            resetInputs()
          }}
        >
          Cancel
        </Button>
      </div>
      {error && <div className='text-red-500 text-sm mt-1'>{error}</div>}
    </div>
  )
}
