import { Button } from './ui/Button'
import { Input } from './ui/Input'

export const AddEntityForm = ({
  title,
  newEntityName,
  newEntityError,
  setNewEntityName,
  handleAddNewEntity,
  onCancel,
  cancelButton,
  size = 'sm'
}: {
  setNewEntityName: React.Dispatch<React.SetStateAction<string>>
  title?: string
  newEntityName: string
  newEntityError: string
  handleAddNewEntity: () => void
  onCancel?: () => void
  cancelButton?: boolean
  size?: 'sm' | 'lg'
}) => {
  return (
    <div className='w-full rounded-md bg-card-muted px-2 py-4'>
      {title && <p className='text-xs mb-2 font-semibold'>{title}</p>}
      <div className='flex gap-2'>
        <Input
          onChange={(e) => setNewEntityName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddNewEntity()
            }
          }}
          value={newEntityName}
          id='team-name'
          inputSize={size}
          placeholder='Team Name'
        />
        <Button
          type='submit'
          variant='secondary'
          size={size}
          className='w-auto'
          onClick={handleAddNewEntity}
        >
          Add
        </Button>
        {cancelButton && (
          <Button
            variant='primary'
            size={size}
            className='w-auto'
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
      {newEntityError && <p className='text-xs text-red-500 mt-1'>{newEntityError}</p>}
    </div>
  )
}
