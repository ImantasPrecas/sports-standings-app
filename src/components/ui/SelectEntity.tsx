import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'

export const SelectEntity = ({
  size,
  placeholder,
  options,
}: {
  size: 'sm' | 'default' | 'lg'
  placeholder: string
  options: { id: string; name: string }[]
}) => {
  return (
    <Select>
      <SelectTrigger size={size} className='w-full bg-muted'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.id}
            value={option.id}
            className='p-2 hover:bg-gray-100 cursor-pointer'
          >
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
