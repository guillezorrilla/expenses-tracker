import { FC } from 'react'
import { ICategoryList } from '../../models'
import { BsTrash } from 'react-icons/bs'

interface ITransactionProps {
  category?: ICategoryList
  handleDelete: (event: any, id: string) => void
}
const Transaction: FC<ITransactionProps> = ({ category, handleDelete }: ITransactionProps) => {
  if (!category) return null
  return (
    <div
      className='item flex justify-center bg-gray-50 py-2 rounded-r'
      style={{ borderRight: `8px solid ${category.color ?? '#e5e5e5'}` }}
    >
      <button className='px-3'>
        <BsTrash
          size={'15px'}
          color={`${category.color ?? '#e5e5e5'}`}
          onClick={(e) => handleDelete(e, category.id)}
        />
      </button>
      <span className='block w-full capitalize'>{category.name ?? ''}</span>
    </div>
  )
}

export default Transaction
