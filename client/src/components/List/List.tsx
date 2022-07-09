import { ICategoryList } from '../../models'
import Transaction from '../Transaction/Transaction'
import { default as api } from '../../redux/actions/apiSlice'

const List = () => {
  const { isError, isFetching, isSuccess, data } = api.useGetLabelsQuery({})
  const [deleteTransaction] = api.useDeleteTransactionMutation()

  const handleDelete = (e: any, id: string) => {
    e.preventDefault()
    deleteTransaction(id)
  }

  let Transactions

  if (isFetching) {
    Transactions = <div>Loading...</div>
  } else if (isSuccess) {
    Transactions = data.map((transaction: ICategoryList, index: number) => {
      return (
        <Transaction
          key={`${transaction.name}-${index}`}
          category={transaction}
          handleDelete={handleDelete}
        />
      )
    })
  } else if (isError) {
    Transactions = <div>Error</div>
  }
  return (
    <div className='flex flex-col py-6 gap-3'>
      <h1 className='py-4 font-bold text-xl'>History</h1>
      {Transactions}
    </div>
  )
}

export default List
