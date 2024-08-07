import { FC } from 'react'
import style from './radio.module.scss'
import { IRadio } from '../interface/radio.interface'
const Radio: FC<IRadio> = ({ setSelect, select, setOpen }) => {
  return (
    <div className={style.radio}>
      <div className={style.radio_title}>
        <span>Пол*</span>
      </div>
      <div className={`${style.radio_sex} ${select === 'Женщина' ? style.radio_sex_active : ''}`} onClick={(e) => {
        const target = e.target as HTMLElement
        setSelect(target.textContent || '')
        setOpen(false)
      }}>
        <span>Женщина</span>
      </div>
      <div className={`${style.radio_sex} ${select === 'Мужчина' ? style.radio_sex_active : ''}`} onClick={(e) => {
        const target = e.target as HTMLElement
        setSelect(target.textContent || '')
        setOpen(false)
      }}>
        <span>Мужчина</span>
      </div>
    </div>
  )
}

export default Radio