import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'

import './Graph.css'
import Labels from '../Labels/Labels'
import { getChartData, getTotal } from '../../helper/helper'
import { default as api } from '../../redux/actions/apiSlice'

Chart.register(ArcElement)
const Graph = () => {
  const { isError, isFetching, isSuccess, data } = api.useGetLabelsQuery({})
  let graphData

  if (isFetching) {
    graphData = <div>Loading...</div>
  } else if (isSuccess) {
    const config = getChartData(data)
    graphData = <Doughnut {...config} />
  } else if (isError) {
    graphData = <div>Error</div>
  }
  return (
    <div className='flex justify-center max-w-xs mx-auto'>
      <div className='item'>
        <div className='chart relative'>
          {graphData}
          <h3 className='mb-4 font-bold title'>
            Total{' '}
            <span className='block text-3-xl text-emerald-400'>${Math.round(getTotal(data))}</span>
          </h3>
        </div>
        <div className='flex flex-col py-10 gap-4'>
          <Labels />
        </div>
      </div>
    </div>
  )
}

export default Graph
