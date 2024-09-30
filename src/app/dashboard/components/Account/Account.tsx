import { FC, FormEvent, useEffect, useState } from 'react'
import style from './Account.module.scss'
import Image from 'next/image'
import { IValidSignUp } from '@/interfaces/Validator.interface'
import { ValidatorService } from '@/services/validator.service'
import { IUser } from '@/interfaces/User.interface'
import { UserService } from '@/services/user.service'

const Account: FC<IUser> = (User: IUser) => {
  const [ShowPassword, setShowPassword] = useState(false)
  const [ShowPasswordRepeat, setShowPasswordRepeat] = useState(false)
  const [formValues, setFormValues] = useState({ Name: '', Email: '', Password: '', PasswordRepeat: '' })
  const [Dirty, setDirty] = useState<IValidSignUp>({})

  const TogglePassword = () => {
    setShowPassword(!ShowPassword)
  }

  const TogglePasswordRepeat = () => {
    setShowPasswordRepeat(!ShowPasswordRepeat)
  }

  const ResetAccount = async (e: FormEvent) => {
    e.preventDefault()
    // const NameError = ValidatorService.ValidName(formValues.Name)
    // const EmailError = ValidatorService.ValidateEmail(formValues.Email)
    const PasswordError = ValidatorService.ValidatePassword(formValues.Password)
    const PasswordRepeatError = ValidatorService.ValidPasswordRepeat(formValues.Password, formValues.PasswordRepeat)

    setDirty({ Password: PasswordError, PasswordRepeat: PasswordRepeatError })

    if (!PasswordError && !PasswordRepeatError) {
      const token = sessionStorage.getItem('auth_token')
      if (token) {
        const result = await UserService.ResetAccount(token, formValues.Password, formValues.PasswordRepeat)
        console.log("Form submitted:", formValues, token)
        console.log(result)
      }
    }
  }

  useEffect(() => {
    const UserData = sessionStorage.getItem('UserData')
    console.log(UserData)
  })

  return (
    <div className={style.content_block}>
      <div className={style.block_title}>
        <Image src={'/image/User.svg'} width={24} height={24} alt='User' />
        <h2>Ваш профиль</h2>
      </div>
      <div className={style.block_content}>
        <form onSubmit={ResetAccount} className={style.form_content}>
          <input className={Dirty.Name ? style.form_name_error : ''} type="text" placeholder={User.name} value={formValues.Name} onChange={(e) => setFormValues({ ...formValues, Name: e.target.value })} />
          <input className={Dirty.Email ? style.form_email_error : ''} type="email" placeholder='Введите ваш e-mal*' value={formValues.Email} onChange={(e) => setFormValues({ ...formValues, Email: e.target.value })} />
          <div style={{ marginTop: '20px' }} className={style.form_password}>
            <input className={Dirty.Password ? style.form_password_error : ''} type={ShowPassword ? 'text' : 'password'} placeholder='Новый пароль*' value={formValues.Password} onChange={(e) => setFormValues({ ...formValues, Password: e.target.value })} />
            {ShowPassword ? <Image src={'/image/EyeOn.svg'} width={24} height={24} alt='eye' onClick={TogglePassword} /> : <Image src={'/image/EyeOff.svg'} width={24} height={24} alt='eye' onClick={TogglePassword} />}
          </div>
          <div className={style.form_password}>
            <input className={Dirty.PasswordRepeat ? style.form_password_repeat_error : ''} type={ShowPasswordRepeat ? 'text' : 'password'} placeholder='Повторите пароль*' value={formValues.PasswordRepeat} onChange={(e) => setFormValues({ ...formValues, PasswordRepeat: e.target.value })} />
            {ShowPasswordRepeat ? <Image src={'/image/EyeOn.svg'} width={24} height={24} alt='eye' onClick={TogglePasswordRepeat} /> : <Image src={'/image/EyeOff.svg'} width={24} height={24} alt='eye' onClick={TogglePasswordRepeat} />}
          </div>
          <button className={style.content_button}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  )
}

export default Account