import './Form.css'
import { useForm } from 'react-hook-form'
import List from '../List/List'
import { default as api } from '../../redux/actions/apiSlice'

const Form = () => {
  const { register, handleSubmit, resetField } = useForm()
  const [addTransaction] = api.useAddTransactionMutation()

  const onSubmit = async (data: any) => {
    if (!data) return {}
    await addTransaction(data).unwrap()
    resetField('name')
    resetField('amount')
  }

  return (
    <div className='form max-w-sm mx-auto w-96'>
      <h1 className='font-bold pb-4 text-xl'>Transaction</h1>
      <form id='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-4'>
          <div className='input-group'>
            <input type='text' {...register('name')} placeholder='Salary, House Rend, SIP' />
          </div>
          <select className='form-input' defaultValue='Investment' {...register('type')}>
            <option value='investment'>Investment</option>
            <option value='savings'>Savings</option>
            <option value='expense'>Expense</option>
          </select>
          <div className='input-group'>
            <input type='text' placeholder='Amount' {...register('amount')} />
          </div>
          <div className='submit-btn'>
            <button className='border py-2 text-white bg-indigo-500 w-full rounded'>
              Make Transaction
            </button>
          </div>
        </div>
      </form>

      <List />
    </div>
  )
}

export default Form
