import { FC, useState } from 'react'
import style from './select.module.scss'
import { ISelect } from './interface/select.interface'
import { optionsSex } from './options/options'
import Radio from './Radio/Radio'

const Select: FC<ISelect> = ({ setSelect, select }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className={open ? style.select_active : style.select}>
      <div className={open ? style.select_choose_active : style.select_choose} onClick={handleClick}>{select ? select : 'Женщина'}</div>
      {open && (
        <Radio setSelect={setSelect} select={select} setOpen={setOpen}/>
        // <div className={style.select_options}>
        //   {optionsSex.map((option) => (
        //     <div className={style.select_option} onClick={(e) => {
        //       const target = e.target as HTMLElement
        //       setSelect(target.textContent || '')
        //       setOpen(false)
        //     }}>{option}</div>
        //   ))}
        // </div>
      )}
    </div>
  )
}

export default Select