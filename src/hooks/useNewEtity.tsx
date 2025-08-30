import { checkExistingEntity } from '@/lib/utils'
import { useState } from 'react'

export const useNewEntity = ({
  addEntity,
  validationId,
  teamsList,
}: {
  addEntity: (name: string) => void
  validationId: string
  teamsList: { id: string; name: string }[]
}) => {
  const [newEntityName, setNewEntityName] = useState<string>('')
  const [newEntityError, setNewEntityError] = useState<string>('')
  const [isAddingNewEntity, setIsAddingNewEntity] = useState<boolean>(false)

  const handleAddNewEntity = () => {
    const newEntity = newEntityName.trim()

    if (!newEntity) {
      setNewEntityError('Should not be empty')
      return
    }

    if (checkExistingEntity(teamsList, validationId, newEntity.toLowerCase())) {
      setNewEntityError('Already exists')
      return
    }

    addEntity(newEntity)
    setIsAddingNewEntity(false)
    resetForm()
  }

  const resetForm = () => {
    setNewEntityName('')
    setNewEntityError('')
  }

  return {
    newEntityName,
    setNewEntityName,
    newEntityError,
    setNewEntityError,
    isAddingNewEntity,
    setIsAddingNewEntity,
    handleAddNewEntity,
    resetForm,
  }
}
