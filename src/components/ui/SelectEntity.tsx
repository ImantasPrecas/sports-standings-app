import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'

export const SelectEntity = ({
  size,
  placeholder,
  options,
}: {
  size: 'sm' | 'default' | 'lg'
  placeholder: string
  options: { name: string; value: string }[]
}) => {
  return (
    <Select>
      <SelectTrigger size={size} className='w-full bg-muted'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className='p-2 hover:bg-gray-100 cursor-pointer'
          >
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
