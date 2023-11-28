interface ISortItem {
  chosen: boolean
  direction: 'asc' | 'desc'
}

export interface IBetSorting {
  Type: ISortItem,
  'Bet date': ISortItem,
  'Bet amount': ISortItem,
  'Potential return': ISortItem,
  'Total odds': ISortItem,
  Results: ISortItem,
  Status: ISortItem
}

const returnSort = (sortItem: string, currentItem: keyof IBetSorting, prevState: IBetSorting) => {
  if (sortItem === currentItem) {
    return {
      chosen: true,
      direction: prevState[currentItem].chosen && prevState[currentItem].direction === 'desc' ? 'asc' : 'desc'
    } as ISortItem
  } else {
    return {
      chosen: false,
      direction: 'desc'
    } as ISortItem
  }
}

export const returnBetsSorting = (sortItem: string, prevState: IBetSorting): IBetSorting => {
  return {
    Type: returnSort(sortItem, 'Type', prevState),
    'Bet date': returnSort(sortItem, 'Bet date', prevState),
    'Bet amount': returnSort(sortItem, 'Bet amount', prevState),
    'Potential return': returnSort(sortItem, 'Potential return', prevState),
    'Total odds': returnSort(sortItem, 'Total odds', prevState),
    Results: returnSort(sortItem, 'Results', prevState),
    Status: returnSort(sortItem, 'Status', prevState),
  }
}

export const BetsSortingObject = '{"Type":{"chosen":false,"direction":"asc"},"Bet date":{"chosen":false,"direction":"asc"},"Bet amount":{"chosen":false,"direction":"asc"},"Potential return":{"chosen":false,"direction":"asc"},"Total odds":{"chosen":false,"direction":"asc"},"Results":{"chosen":false,"direction":"asc"},"Status":{"chosen":false,"direction":"asc"}}'

