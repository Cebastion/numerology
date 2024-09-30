'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FC, FormEvent, useState } from 'react'
import style from './page.module.scss'
import { ValidatorService } from '@/services/validator.service'
import { IValidLogIn } from '@/interfaces/Validator.interface'
import { UserService } from '@/services/user.service'
import { AxiosError } from 'axios'
import ResetPassword from '@/components/ResetPassword/ResetPassword'
import React from 'react'

const page: FC = () => {
  const [ShowPassword, setShowPassword] = useState(false)
  const [formValues, setFormValues] = useState({ Email: '', Password: '' })
  const [Dirty, setDirty] = useState<IValidLogIn>({})
  const [PopUp, SetPopUp] = useState(false)

  const TogglePopUp = () => {
    SetPopUp(!PopUp)
  }

  const TogglePassword = () => {
    setShowPassword(!ShowPassword)
  }

  const LogIn = async (e: FormEvent) => {
    e.preventDefault()
    const EmailError = ValidatorService.ValidateEmail(formValues.Email)
    const PasswordError = ValidatorService.ValidatePassword(formValues.Password)

    setDirty({ Email: EmailError, Password: PasswordError })

    if (!EmailError && !PasswordError) {
      try {
        console.log("Form submitted:", formValues)
        const response = await UserService.LogIn(formValues.Email, formValues.Password)
        localStorage.setItem("login", JSON.stringify({ email: formValues.Email, password: formValues.Password }));
        if (!response.result && response.error) {
          setDirty({ Email: true, Password: true })
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
          setDirty({ Email: true, Password: true })
        }
      }
    }
  }

  return (
    <>
      {PopUp && <ResetPassword SetOpen={SetPopUp} />}
      <div className={style.content}>
        <div className="content__container">
          <div className={style.content_body}>
            <div className={style.content_title}>
              <h1>Здравствуй, дорогой <span>друг</span>!</h1>
              <p>Спасибо, что ты с нами. Желаем приятно провести время на нашем сервисе</p>
            </div>
            <form onSubmit={LogIn} className={style.content_from}>
              <div className={style.form_title}>
                <h2>Вход в личный кабинет</h2>
              </div>
              <div className={style.form_inputs}>
                <input className={Dirty.Email ? style.form_email_error : ''} type="email" placeholder='Введите ваш e-mal*' value={formValues.Email} onChange={(e) => setFormValues({ ...formValues, Email: e.target.value })} />
                <div className={style.form_password}>
                  <input className={Dirty.Password ? style.form_password_error : ''} type={ShowPassword ? 'text' : 'password'} placeholder='Пароль*' value={formValues.Password} onChange={(e) => setFormValues({ ...formValues, Password: e.target.value })} />
                  {ShowPassword ? <Image src={'/image/EyeOn.svg'} width={24} height={24} alt='eye' onClick={TogglePassword} /> : <Image src={'/image/EyeOff.svg'} width={24} height={24} alt='eye' onClick={TogglePassword} />}
                </div>
              </div>
              <div className={style.form_button}>
                <button>Войти</button>
              </div>
            </form>
            <div className={style.content_forgotten}>
              <span onClick={TogglePopUp}>Я не помню пароль</span>
            </div>
            <div className={style.content_signup}>
              <span>У вас нет аккаунта?<Link href="/signup">Зарегистрируйтесь</Link></span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
