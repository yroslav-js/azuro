"use client"

import styles from "./Filters.module.css";
import {fetchSports, sortTime} from "@/redux/subgraph/callFunctions";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {Dispatch, FC, SetStateAction, useState} from "react";
import {IFilter} from "@/redux/features/azuroInterface";

const filters: IFilter = {
  filterTitle: 'BY STATUS',
  items: [
    {
      item: 'All',
      slug: ''
    },
    {
      item: 'Today',
      slug: 'today'
    },
    {
      item: 'Tomorrow',
      slug: 'tomorrow'
    },
    {
      item: '1h',
      slug: '1h'
    },
    {
      item: '3h',
      slug: '3h'
    },
    {
      item: '6h',
      slug: '6h'
    },
  ]
}

const Filters: FC<{ setLoading: Dispatch<SetStateAction<boolean>>, loading: boolean }> = ({setLoading, loading}) => {
  const sports = useAppSelector(state => state.azuroSlice.sportFilter)
  const dispatch = useAppDispatch()
  const [sort, setSort] = useState({})

  return (
    <div className={styles.filters}>
      <div className={styles.filtersHead}>Filters</div>
      <div className={styles.filtersContent}>
        {[sports, filters].map((filter => (
          <div key={filter.filterTitle}>
            <div className={styles.filterTitle}>{filter.filterTitle}</div>
            <div className={styles.filterItems}>{filter.items.map(({item}, id) => (
              <div onClick={() => {
                if (loading) return
                setLoading(true)
                setSort(item.toLowerCase() as keyof typeof sortTime)
                dispatch(fetchSports(sortTime[`${item.toLowerCase() as keyof typeof sortTime}`]
                ))
              }}
                   key={item} className={sort === item.toLowerCase() ? styles.active : ''}>
                <p>{item}</p></div>
            ))}</div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default Filters;