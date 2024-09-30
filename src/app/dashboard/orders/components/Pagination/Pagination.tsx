import { FC } from 'react'
import style from './pagination.module.scss'


interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderedPages: JSX.Element[] = [];

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePage = (page: number) => {
    onPageChange(page)
  }


  for (let i = 0; i < totalPages; i++) {
    renderedPages.push(
      <button className={`${style.pagination__link} ${currentPage === i + 1 ? style.pagination__link_active : ''}`} key={i} onClick={() => handlePage(i + 1)}>{i + 1}</button>
    );
  }

  return (
    <div className={style.pagination}>
      <div className={style.pagination__container}>
        <button className={`${style.pagination__prev} ${style.pagination__disabled}`} onClick={handlePrevious} disabled={currentPage === 1}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.999999 13L7 7L1 1" stroke="#252529" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        {renderedPages}
        <button className={style.pagination__next} onClick={handleNext} disabled={currentPage === totalPages}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.999999 13L7 7L1 1" stroke="#252529" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Pagination