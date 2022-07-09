import { getLabels } from '../../helper/helper'
import { ILabel } from '../../models'

import { default as api } from '../../redux/actions/apiSlice'

const LabelComponent = ({ data }: { data: ILabel }) => {
  return (
    <div className='labels flex justify-between'>
      <div className='flex gap-2'>
        <div
          className='w-2 h-2 rounded py-3'
          style={{
            backgroundColor: data.color ?? '#f9c74f',
          }}
        ></div>
        <h3 className='text-md capitalize'>{data.type ?? ''}</h3>
      </div>
      <h3 className='font-bold'>{Math.round(data.percent) ?? '25'}%</h3>
    </div>
  )
}

const Labels = () => {
  const { isError, isFetching, isSuccess, data } = api.useGetLabelsQuery({})

  let Transactions

  if (isFetching) {
    Transactions = <div>Loading...</div>
  } else if (isSuccess) {
    const graphLabel = getLabels(data)
    Transactions = graphLabel.map((transaction: ILabel, index: number) => {
      return <LabelComponent key={`${transaction.type}-${index}`} data={transaction} />
    })
  } else if (isError) {
    Transactions = <div>Error</div>
  }

  return <>{Transactions}</>
}

export default Labels
