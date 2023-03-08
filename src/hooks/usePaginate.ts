import { useState } from 'react'

interface Props {
  total: number
  pageSize: number | undefined
}

const usePaginate = ({ total, pageSize }: Props) => {
  const pages = pageSize ? Math.ceil(total / pageSize) : 1

  const [currPage, setCurrPage] = useState<number>(1)

  const updatePage = (op: 'prev' | 'next') => {
    if (currPage === (op === 'prev' ? 0 : pages)) return
    setCurrPage((n) => (op === 'prev' ? n - 1 : n + 1))
  }

  return {
    pages,
    currPage,
    nextPage: () => updatePage('next'),
    prevPage: () => updatePage('prev'),
    goToLastPage: () => setCurrPage(pages),
    goToFirstPage: () => setCurrPage(1),
    pageSize,
    total,
  }
}

export default usePaginate
