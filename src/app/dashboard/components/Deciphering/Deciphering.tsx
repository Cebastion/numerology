import { ChangeEvent, FC, FormEvent, useState } from 'react'
import style from './Deciphering.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IValidCompatibility } from '@/interfaces/Compatibility.interface'
import { IValidForecast } from '@/interfaces/Forecast.interface'
import { IValidMatrix } from '@/interfaces/Matrix.inteface'
import { ValidatorService } from '@/services/validator.service'
import Select from '@/UI/Select/Select'
import SelectCalculator from '../../UI/Select/Select'
import PenSvg from '../../../assets/Pen.svg'

const Deciphering: FC = () => {
  const [select, setSelect] = useState('Матрица судьбы')
  const [selectMatrix, setSelectMatrix] = useState('Женщина')
  const [selectForecast, setSelectForecast] = useState('Женщина')
  const [DirtyForecast, SetDirtyForecast] = useState<IValidForecast>({})
  const [DirtyCompatibility, SetDirtyCompatibility] = useState<IValidCompatibility>({})
  const [DirtyMatrix, SetDirtyMatrix] = useState<IValidMatrix>({})
  const router = useRouter()


  const [FormMatrix, SetFormMatrix] = useState({
    Name: '',
    Date: '',
    Gender: ''
  })

  const [FormForecast, SetFormForecast] = useState({
    Name: '',
    Date: '',
    Gender: ''
  })

  const [FormCompatibility, SetFormCompatibility] = useState({
    WomanName: '',
    ManName: '',
    WomanDate: '',
    ManDate: '',
  })

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>, formName: string, fieldName: string) => {
    let value = e.target.value.replace(/\D/g, '') // Удаляем все нецифровые символы

    // Добавляем точки после второй и пятой цифры
    if (value.length > 1) value = value.slice(0, 2) + '.' + value.slice(2)
    if (value.length > 4) value = value.slice(0, 5) + '.' + value.slice(5, 9)

    // Обрезаем строку, чтобы она не превышала длину 10 символов
    if (value.length > 10) value = value.slice(0, 10)

    // Обновляем соответствующую форму
    if (formName === 'formMatrix') {
      SetFormMatrix({ ...FormMatrix, [fieldName]: value })
    } else if (formName === 'formForecast') {
      SetFormForecast({ ...FormForecast, [fieldName]: value })
    } else if (formName === 'formCompatibility') {
      SetFormCompatibility({ ...FormCompatibility, [fieldName]: value })
    }
  }

  const Redirect = (select: string) => {
    if (select === 'Матрица судьбы') {
      const NameError = ValidatorService.ValidName(FormMatrix.Name)
      const DateError = ValidatorService.ValidDate(FormMatrix.Date)

      SetDirtyMatrix({ Name: NameError, Date: DateError })

      if (!NameError && !DateError) {
        if (selectMatrix === 'Женщина') {
          FormMatrix.Gender = 'Ж'
        }
        if (selectMatrix === 'Мужчина') {
          FormMatrix.Gender = 'М'
        }
        localStorage.setItem('matrix', JSON.stringify(FormMatrix))
        router.push('/matrix')
      }
    }
    if (select === 'Прогноз по годам') {
      const NameError = ValidatorService.ValidName(FormForecast.Name)
      const DateError = ValidatorService.ValidDate(FormForecast.Date)

      SetDirtyForecast({ Name: NameError, Date: DateError })

      if (!NameError && !DateError) {
        if (selectForecast === 'Женщина') {
          FormForecast.Gender = 'Ж'
        }
        if (selectForecast === 'Мужчина') {
          FormForecast.Gender = 'М'
        }
        localStorage.setItem('forecast', JSON.stringify(FormForecast))
        router.push('/forecast')
      }
    }
    if (select === 'Совместимость') {
      const ManNameError = ValidatorService.ValidName(FormCompatibility.ManName)
      const ManDateError = ValidatorService.ValidDate(FormCompatibility.ManDate)
      const WomanNameError = ValidatorService.ValidName(FormCompatibility.WomanName)
      const WomanDateError = ValidatorService.ValidDate(FormCompatibility.WomanDate)

      SetDirtyCompatibility({ WomanName: WomanNameError, WomanDate: WomanDateError, ManName: ManNameError, ManDate: ManDateError })

      if (!WomanNameError && !WomanNameError && !ManNameError && !ManDateError) {
        console.log("Form submitted:", FormCompatibility)
        router.push('/compatibility')
      }
    }
  }

  return (
    <div className={style.content_block}>
      <div className={style.block_title}>
        <Image src={PenSvg} alt="pen" width={24} height={24} />
        <h2>Выберите расшировку</h2>
      </div>
      <div className={style.block_content}>
        <SelectCalculator select={select} setSelect={setSelect} />
        {select === 'Матрица судьбы' && (
          <form className={style.form}>
            <input type="text" placeholder='Введите ваше имя*' style={DirtyMatrix.Name ? {
              boxSizing: 'border-box',
              border: '2px solid rgb(251, 140, 140)',
              borderRadius: '100px',
              background: 'rgb(255, 255, 255)'
            } : undefined} value={FormMatrix.Name} onChange={(e) => SetFormMatrix({ ...FormMatrix, Name: e.target.value })} />
            <input pattern="\d{2}\.\d{2}\.\d{4}" type="text" placeholder='Введите дату рождения*' style={DirtyMatrix.Date ? {
              boxSizing: 'border-box',
              border: '2px solid rgb(251, 140, 140)',
              borderRadius: '100px',
              background: 'rgb(255, 255, 255)'
            } : undefined} value={FormMatrix.Date} onChange={(e) => handleDateChange(e, 'formMatrix', 'Date')} />
            <Select select={selectMatrix} setSelect={setSelectMatrix} />
          </form>
        )}
        {select === 'Прогноз по годам' && (
          <form className={style.form}>
            <input type="text" placeholder='Введите ваше имя*' style={DirtyForecast.Name ? {
              boxSizing: 'border-box',
              border: '2px solid rgb(251, 140, 140)',
              borderRadius: '100px',
              background: 'rgb(255, 255, 255)'
            } : undefined} value={FormForecast.Name} onChange={(e) => SetFormForecast({ ...FormForecast, Name: e.target.value })} />
            <input pattern="\d{2}\.\d{2}\.\d{4}" type="text" placeholder='Введите дату рождения*' style={DirtyForecast.Date ? {
              boxSizing: 'border-box',
              border: '2px solid rgb(251, 140, 140)',
              borderRadius: '100px',
              background: 'rgb(255, 255, 255)'
            } : undefined} value={FormForecast.Date} onChange={(e) => handleDateChange(e, 'formForecast', 'Date')} />
            <Select select={selectForecast} setSelect={setSelectForecast} />
          </form>
        )}
        {select === 'Совместимость' && (
          <form style={{gap: '30px'}} className={style.form}>
            <div className={style.form_sex}>
              <div className={style.form_title}>
                <Image src={'/image/woman.svg'} width={24} height={24} alt="woman" />
                <h3>Женщина</h3>
              </div>
              <input type="text" placeholder='Введите ваше имя*' style={DirtyCompatibility.WomanName ? {
                boxSizing: 'border-box',
                border: '2px solid rgb(251, 140, 140)',
                borderRadius: '100px',
                background: 'rgb(255, 255, 255)'
              } : undefined} value={FormCompatibility.WomanName} onChange={(e) => SetFormCompatibility({ ...FormCompatibility, WomanName: e.target.value })} />
              <input pattern="\d{2}\.\d{2}\.\d{4}" type="text" placeholder='Введите дату рождения*' style={DirtyCompatibility.WomanDate ? {
                boxSizing: 'border-box',
                border: '2px solid rgb(251, 140, 140)',
                borderRadius: '100px',
                background: 'rgb(255, 255, 255)'
              } : undefined} value={FormCompatibility.WomanDate} onChange={(e) => handleDateChange(e, 'formCompatibility', 'WomanDate')} />
            </div>
            <div className={style.form_sex}>
              <div className={style.form_title}>
                <Image src={'/image/man.svg'} width={24} height={24} alt="man" />
                <h3>мужчина</h3>
              </div>
              <input type="text" placeholder='Введите ваше имя*' style={DirtyCompatibility.ManName ? {
                boxSizing: 'border-box',
                border: '2px solid rgb(251, 140, 140)',
                borderRadius: '100px',
                background: 'rgb(255, 255, 255)'
              } : undefined} value={FormCompatibility.ManName} onChange={(e) => SetFormCompatibility({ ...FormCompatibility, ManName: e.target.value })} />
              <input pattern="\d{2}\.\d{2}\.\d{4}" type="text" placeholder='Введите дату рождения*' style={DirtyCompatibility.ManDate ? {
                boxSizing: 'border-box',
                border: '2px solid rgb(251, 140, 140)',
                borderRadius: '100px',
                background: 'rgb(255, 255, 255)'
              } : undefined} value={FormCompatibility.ManDate} onChange={(e) => handleDateChange(e, 'formCompatibility', 'ManDate')} />
            </div>
          </form>
        )}
      </div>
      <button className={style.content_button} onClick={() => Redirect(select)}>
        Рассчитать
      </button>
    </div>
  )
}

export default Deciphering