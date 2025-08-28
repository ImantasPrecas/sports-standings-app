import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'

export const SelectEntity = ({
  size,
  placeholder,
  options,
  value,
  onSelect,
}: {
  size: 'sm' | 'default' | 'lg'
  placeholder: string
  options: { id: string; name: string }[]
  value: string
  onSelect: (id: string) => void
}) => {
  return (
    <Select onValueChange={onSelect} value={value}>
      <SelectTrigger size={size} className='w-full bg-muted'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.length === 0 ? (
          <p className='mx-2 text-center text-sm'>No teams</p>
        ) : (
          options.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id}
              className='p-2 hover:bg-gray-100 cursor-pointer'
            >
              {option.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  )
}
