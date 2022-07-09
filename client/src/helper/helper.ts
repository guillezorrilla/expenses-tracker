import _ from 'lodash'

export const getSum = (transaction: any, type?: string) => {
  const sum = _(transaction)
    .groupBy('type')
    .map((objs, key) => {
      if (!type) return _.sumBy(objs, 'amount')
      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, 'amount'),
      }
    })
    .value()
  return sum
}

export const getLabels = (transaction: any) => {
  const amountSum = getSum(transaction, 'type')
  const Total = _.sum(getSum(transaction))
  const percent = _(amountSum)
    .map((objs: any) => _.assign(objs, { percent: (100 * objs.total) / Total }))
    .value()
  return percent
}

export const getChartData = (transaction: any, custom?: any) => {
  let bg = _.map(transaction, (a) => a.color)
  bg = _.uniq(bg)
  const dataValue = getSum(transaction)

  const config = {
    data: {
      datasets: [
        {
          label: 'My First Dataset',
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  }

  return custom ?? config
}

export const getTotal = (transaction: any) => {
  return _.sum(getSum(transaction))
}
