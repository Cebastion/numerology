'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FC, FormEvent, useEffect, useState } from 'react'
import style from './page.module.scss'
import { ValidatorService } from '@/services/validator.service'
import { IValidSignUp } from '@/interfaces/Validator.interface'
import { UserService } from '@/services/user.service'

const page: FC = () => {
  const [ShowPassword, setShowPassword] = useState(false)
  const [ShowPasswordRepeat, setShowPasswordRepeat] = useState(false)
  const [formValues, setFormValues] = useState({ Name:'', Email: '', Password: '', PasswordRepeat: '' })
  const [Dirty, setDirty] = useState<IValidSignUp>({})

  const TogglePassword = () => {
    setShowPassword(!ShowPassword)
  }

  const TogglePasswordRepeat = () => {
    setShowPasswordRepeat(!ShowPasswordRepeat)
  }

  const SignUp = async (e: FormEvent) => {
    e.preventDefault()
    const NameError = ValidatorService.ValidName(formValues.Name)
    const EmailError = ValidatorService.ValidateEmail(formValues.Email)
    const PasswordError = ValidatorService.ValidatePassword(formValues.Password)
    const PasswordRepeatError = ValidatorService.ValidPasswordRepeat(formValues.Password, formValues.PasswordRepeat)

    setDirty({ Name: NameError, Email: EmailError, Password: PasswordError, PasswordRepeat: PasswordRepeatError })

    if(!NameError && !EmailError && !PasswordError && !PasswordRepeatError) {
      const response = await UserService.SignUp(formValues.Email, formValues.Password, formValues.Name)
      sessionStorage.setItem("signup", JSON.stringify({ email: formValues.Email, password: formValues.Password }));
      if (!response.result && response.error) {
        setDirty({ Name: NameError, Email: EmailError, Password: PasswordError, PasswordRepeat: PasswordRepeatError })
      }
    }
  }

  return (
    <div className={style.content}>
      <div className="content__container">
        <div className={style.content_body}>
          <div className={style.content_title}>
            <h1>Здравствуй, дорогой <span>друг</span>!</h1>
            <p>Спасибо, что ты с нами. Желаем приятно провести время на нашем сервисе</p>
          </div>
          <form onSubmit={SignUp} className={style.content_from}>
            <div className={style.form_title}>
              <h2>Регистрация</h2>
            </div>
            <div className={style.form_inputs}>
              <input minLength={2} maxLength={40} className={Dirty.Name ? style.form_name_error : ''} type="text" placeholder='Введите ваше имя*' value={formValues.Name} onChange={(e) => setFormValues({ ...formValues, Name: e.target.value })} />
              <input className={Dirty.Email ? style.form_email_error : ''} type="email" placeholder='Введите ваш e-mal*' value={formValues.Email} onChange={(e) => setFormValues({ ...formValues, Email: e.target.value })} />
              <div style={{marginTop: '20px'}} className={style.form_password}>
                <input minLength={8} maxLength={64} className={Dirty.Password ? style.form_password_error : ''} type={ShowPassword ? 'text' : 'password'} placeholder='Пароль*' value={formValues.Password} onChange={(e) => setFormValues({ ...formValues, Password: e.target.value })} />
                {ShowPassword ? <Image src={'/image/EyeOn.svg'} width={24} height={24} alt='eye' onClick={TogglePassword} /> : <Image src={'/image/EyeOff.svg'} width={24} height={24} alt='eye' onClick={TogglePassword} />}
              </div>
              <div className={style.form_password}>
                <input minLength={8} maxLength={64} className={Dirty.PasswordRepeat ? style.form_password_repeat_error : ''} type={ShowPasswordRepeat ? 'text' : 'password'} placeholder='Повторите пароль*' value={formValues.PasswordRepeat} onChange={(e) => setFormValues({ ...formValues, PasswordRepeat: e.target.value })} />
                {ShowPasswordRepeat ? <Image src={'/image/EyeOn.svg'} width={24} height={24} alt='eye' onClick={TogglePasswordRepeat} /> : <Image src={'/image/EyeOff.svg'} width={24} height={24} alt='eye' onClick={TogglePasswordRepeat} />}
              </div>
            </div>
            <div className={style.form_button}>
              <button>Зарегистрироваться</button>
            </div>
          </form>
          <div className={style.content_signup}>
            <span>Уже есть аккаунт?<Link href="/login">Войдите</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page