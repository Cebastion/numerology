import Tariffs from '@/components/Tariffs/Tariffs'
import Image from 'next/image'
import { FC } from 'react'
import style from './page.module.scss'
import './schema.scss'
import './destiny.scss'


const matrix: FC = () => {
  return (
    <main className="content">
      <div className="content_container">
        <div className={style.content_title}>
          <h1>Ваш персональный расчет <span>матрицы судьбы</span></h1>
        </div>
        <div className={style.content_user}>
          <div className={style.user_block}>
            <Image src={`/image/Sexwoman.svg`} alt='woman' width={30} height={30} />
            <span>Имя: <b>Оля</b></span>
          </div>
          <div className={style.user_block}>
            <span>Дата рождения: <b>25.01.2000</b></span>
          </div>
          <div className={style.user_block}>
            <span>Возраст: <b>29 лет</b></span>
          </div>
        </div>
        <div className={style.content_user}>
          <div className={style.user_block}>
            <Image src={`/image/Sexman.svg`} alt='man' width={30} height={30} />
            <span>Имя: <b>Оля</b></span>
          </div>
          <div className={style.user_block}>
            <span>Дата рождения: <b>25.01.2000</b></span>
          </div>
          <div className={style.user_block}>
            <span>Возраст: <b>29 лет</b></span>
          </div>
        </div>
        <div className={style.content_schema}>
          <div className={style.schema_container}>
            <div className={style.schema_row}>
              <div className={style.row_right}>
                <div className={style.schema_title}>
                  <h2>Карта <span>здоровья</span></h2>
                </div>
                <div className={style.schema_block}>
                  <div className={style.table_container}>
                    <div className={style.header_row}>
                      <span>Чакра</span>
                      <div className={style.header_row_right}>
                        <span>Физика</span>
                        <span>Энергия</span>
                        <span>Эмоции</span>
                      </div>
                    </div>
                    <div className={style.table_body}>
                      <div className={style.chakra_row}>
                        <div className={style.chakra_name}>
                          <div style={{ backgroundColor: 'rgb(211, 70, 69)' }} className={style.chakra_dot}></div>
                          <span style={{ color: 'rgb(211, 70, 69)' }}>Муладхара</span>
                          <div className={style.chakra_info}>
                            <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                            <div className={style.info_block}>
                              <div className={style.info_title}>
                                <h4>Муладхар</h4>
                              </div>
                              <div className={style.info_text}>
                                <p>За что отвечает:</p>
                                <p>Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={style.chakra_numbers}>
                          <span>5</span>
                          <span>19</span>
                          <span>6</span>
                        </div>
                      </div>
                      <div className={style.chakra_row}>
                        <div className={style.chakra_name}>
                          <div style={{ backgroundColor: 'rgb(255, 124, 3)' }} className={style.chakra_dot}></div>
                          <span style={{ color: 'rgb(255, 124, 3)' }}>Свадхистана</span>
                          <div className={style.chakra_info}>
                            <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                            <div className={style.info_block}>
                              <div className={style.info_title}>
                                <h4>Муладхар</h4>
                              </div>
                              <div className={style.info_text}>
                                <p>За что отвечает:</p>
                                <p>Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={style.chakra_numbers}>
                          <span>5</span>
                          <span>19</span>
                          <span>6</span>
                        </div>
                      </div>
                      <div className={style.chakra_row}>
                        <div className={style.chakra_name}>
                          <div style={{ backgroundColor: 'rgb(251, 201, 59)' }} className={style.chakra_dot}></div>
                          <span style={{ color: 'rgb(251, 201, 59)' }}>Манипура</span>
                          <div className={style.chakra_info}>
                            <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                            <div className={style.info_block}>
                              <div className={style.info_title}>
                                <h4>Муладхар</h4>
                              </div>
                              <div className={style.info_text}>
                                <p>За что отвечает:</p>
                                <p>Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={style.chakra_numbers}>
                          <span>5</span>
                          <span>19</span>
                          <span>6</span>
                        </div>
                      </div>
                      <div className={style.chakra_row}>
                        <div className={style.chakra_name}>
                          <div style={{ backgroundColor: 'rgb(124, 185, 105)' }} className={style.chakra_dot}></div>
                          <span style={{ color: 'rgb(124, 185, 105)' }}>Анахата</span>
                          <div className={style.chakra_info}>
                            <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                            <div className={style.info_block}>
                              <div className={style.info_title}>
                                <h4>Муладхар</h4>
                              </div>
                              <div className={style.info_text}>
                                <p>За что отвечает:</p>
                                <p>Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={style.chakra_numbers}>
                          <span>5</span>
                          <span>19</span>
                          <span>6</span>
                        </div>
                      </div>
                      <div className={style.chakra_row}>
                        <div className={style.chakra_name}>
                          <div style={{ backgroundColor: 'rgb(77, 185, 245)' }} className={style.chakra_dot}></div>
                          <span style={{ color: 'rgb(77, 185, 245)' }}>Вишудха</span>
                          <div className={style.chakra_info}>
                            <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                            <div className={style.info_block}>
                              <div className={style.info_title}>
                                <h4>Муладхар</h4>
                              </div>
                              <div className={style.info_text}>
                                <p>За что отвечает:</p>
                                <p>Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={style.chakra_numbers}>
                          <span>5</span>
                          <span>19</span>
                          <span>6</span>
                        </div>
                      </div>
                      <div className={style.chakra_row}>
                        <div className={style.chakra_name}>
                          <div style={{ backgroundColor: 'rgb(17, 113, 203)' }} className={style.chakra_dot}></div>
                          <span style={{ color: 'rgb(17, 113, 203)' }}>Аджна</span>
                          <div className={style.chakra_info}>
                            <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                            <div className={style.info_block}>
                              <div className={style.info_title}>
                                <h4>Муладхар</h4>
                              </div>
                              <div className={style.info_text}>
                                <p>За что отвечает:</p>
                                <p>Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={style.chakra_numbers}>
                          <span>5</span>
                          <span>19</span>
                          <span>6</span>
                        </div>
                      </div>
                      <div className={style.chakra_row}>
                        <div className={style.chakra_name}>
                          <div style={{ backgroundColor: 'rgb(139, 70, 193)' }} className={style.chakra_dot}></div>
                          <span style={{ color: 'rgb(139, 70, 193)' }}>Сахасрара</span>
                          <div className={style.chakra_info}>
                            <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                            <div className={style.info_block}>
                              <div className={style.info_title}>
                                <h4>Муладхар</h4>
                              </div>
                              <div className={style.info_text}>
                                <p>За что отвечает:</p>
                                <p>Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={style.chakra_numbers}>
                          <span>5</span>
                          <span>19</span>
                          <span>6</span>
                        </div>
                      </div>
                    </div>
                    <div className={style.result_row}>
                      <span>Результат:</span>
                      <div className={style.result_row_right}>
                        <span>12</span>
                        <span>13</span>
                        <span>7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.row_left}>
                <div className={style.schema_title}>
                  <h2>Диаграмма <span style={{ color: '#d61e8c' }}>совместимости</span></h2>
                </div>
                <div className={style.schema}>
                  <div className="X point">7</div>
                  <div className="Y point">8</div>
                  <div className="E2 point">22</div>
                  <div className="E1 point">1</div>
                  <div className="E point">14</div>
                  <div className="B3 point">65</div>
                  <div className="B2 point">77</div>
                  <div className="B1 point">85</div>
                  <div className="B point">9</div>
                  <div className="F2 point">5</div>
                  <div className="F1 point">11</div>
                  <div className="F point">8</div>
                  <div className="C2 point">3</div>
                  <div className="C1 point">6</div>
                  <div className="C point">15</div>
                  <div className="M point">5</div>
                  <div className="L point">2</div>
                  <div className="G4 point">6</div>
                  <div className="G2 point">64</div>
                  <div className="G1 point">86</div>
                  <div className="G point">6</div>
                  <div className="D2 point">8</div>
                  <div className="D1 point">2</div>
                  <div className="D point">44</div>
                  <div className="H2 point">1</div>
                  <div className="H1 point">4</div>
                  <div className="H point">6</div>
                  <div className="A3 point">55</div>
                  <div className="A2 point">76</div>
                  <div className="A1 point">2</div>
                  <div className="A point">11</div>
                  <Image src={`/image/Schema2.svg`} width={640} height={581} alt="schema" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.content_destiny}>
          <div className={style.destiny_container}>
            <div className={style.destiny_row}>
              <div className={style.destiny_block}>
                <div className={style.destiny_block_row}>
                  <span>Небо</span>
                  <span>Земля</span>
                </div>
                <div className={style.destiny_img}>
                  <div className="LN point-text">10</div>
                  <div className="LZ point-text">2</div>
                  <div className="LP1 point-text">10</div>
                  <Image src={`/image/destiny.png`} width={300} height={150} alt="destiny" />
                </div>
              </div>
              <div className={style.destiny_block}>
                <div className={style.destiny_block_row}>
                  <span>Муж</span>
                  <span>Жен</span>
                </div>
                <div className={style.destiny_img}>
                  <div className="LN point-text">10</div>
                  <div className="LZ point-text">2</div>
                  <div className="LP1 point-text">10</div>
                  <Image src={`/image/destiny.png`} width={300} height={150} alt="destiny" />
                </div>
              </div>
              <div className={style.destiny_block}>
                <div className={style.destiny_block_column}>
                  <div className={style.destiny_block_column_row}>
                    <span>Общее</span>
                    <div className={style.destiny_block_column_circle}>
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.content_spoiler}>
          <div className={style.forecast_blocks}>
            <div className={style.forecast_info}>
              <div className={style.forecast_age}>
                <span>Описание пары</span>
              </div>
              <div className={style.forecast_status}>
                <span style={{color: '#72b969'}}>Блок открыт</span>
                <Image src={'/image/Openblock.svg'} width={24} height={24} alt='open' />
              </div>
            </div>
            <div className={`${style.forecast_block_column}`}>
              <div className={style.forecast_sub_block}>
                <div className={style.forecast_block_title}>
                  <h2>Биоритмы и чакры: <span style={{color: "#d61e8c"}}>100% - негативное дублирование биоритмов</span></h2>
                </div>
                <div className={style.forecast_block}>
                  <div className={style.block_top}>
                    <div className={style.block_top_title}>
                      <Image src={`/image/icon1.svg`} alt='icon' width={30} height={30}/>
                      <h4>Физический / <span style={{color: "#d34645"}}>Муладхара</span></h4>
                    </div>
                    <div className={style.block_top_precept}>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className={style.block_bottom}>
                    <div className={style.block_bottom_traits}>
                      <span>Иснстинк продолжения рода, уровень страсти</span>
                    </div>
                    <div className={style.block_bottom_result}>
                      <p>Максимум</p>
                      <p>«Я хочу партнёра»</p>
                    </div>
                  </div>
                </div>
                <div className={style.forecast_block}>
                  <div className={style.block_top}>
                    <div className={style.block_top_title}>
                      <Image src={`/image/icon1.svg`} alt='icon' width={30} height={30}/>
                      <h4>Физический / <span style={{color: "#d34645"}}>Муладхара</span></h4>
                    </div>
                    <div className={style.block_top_precept}>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className={style.block_bottom}>
                    <div className={style.block_bottom_traits}>
                      <span>Иснстинк продолжения рода, уровень страсти</span>
                    </div>
                    <div className={style.block_bottom_result}>
                      <p>Максимум</p>
                      <p>«Я хочу партнёра»</p>
                    </div>
                  </div>
                </div>
                <div className={style.forecast_block}>
                  <div className={style.block_top}>
                    <div className={style.block_top_title}>
                      <Image src={`/image/icon1.svg`} alt='icon' width={30} height={30}/>
                      <h4>Физический / <span style={{color: "#d34645"}}>Муладхара</span></h4>
                    </div>
                    <div className={style.block_top_precept}>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className={style.block_bottom}>
                    <div className={style.block_bottom_traits}>
                      <span>Иснстинк продолжения рода, уровень страсти</span>
                    </div>
                    <div className={style.block_bottom_result}>
                      <p>Максимум</p>
                      <p>«Я хочу партнёра»</p>
                    </div>
                  </div>
                </div>
                <div className={style.forecast_block}>
                  <div className={style.block_top}>
                    <div className={style.block_top_title}>
                      <Image src={`/image/icon1.svg`} alt='icon' width={30} height={30}/>
                      <h4>Физический / <span style={{color: "#d34645"}}>Муладхара</span></h4>
                    </div>
                    <div className={style.block_top_precept}>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className={style.block_bottom}>
                    <div className={style.block_bottom_traits}>
                      <span>Иснстинк продолжения рода, уровень страсти</span>
                    </div>
                    <div className={style.block_bottom_result}>
                      <p>Максимум</p>
                      <p>«Я хочу партнёра»</p>
                    </div>
                  </div>
                </div>
                <div className={style.forecast_block}>
                  <div className={style.block_top}>
                    <div className={style.block_top_title}>
                      <Image src={`/image/icon1.svg`} alt='icon' width={30} height={30}/>
                      <h4>Физический / <span style={{color: "#d34645"}}>Муладхара</span></h4>
                    </div>
                    <div className={style.block_top_precept}>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className={style.block_bottom}>
                    <div className={style.block_bottom_traits}>
                      <span>Иснстинк продолжения рода, уровень страсти</span>
                    </div>
                    <div className={style.block_bottom_result}>
                      <p>Максимум</p>
                      <p>«Я хочу партнёра»</p>
                    </div>
                  </div>
                </div>
                <div className={style.forecast_block}>
                  <div className={style.block_top}>
                    <div className={style.block_top_title}>
                      <Image src={`/image/icon1.svg`} alt='icon' width={30} height={30}/>
                      <h4>Физический / <span style={{color: "#d34645"}}>Муладхара</span></h4>
                    </div>
                    <div className={style.block_top_precept}>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className={style.block_bottom}>
                    <div className={style.block_bottom_traits}>
                      <span>Иснстинк продолжения рода, уровень страсти</span>
                    </div>
                    <div className={style.block_bottom_result}>
                      <p>Максимум</p>
                      <p>«Я хочу партнёра»</p>
                    </div>
                  </div>
                </div>
                <div className={style.forecast_block}>
                  <div className={style.block_top}>
                    <div className={style.block_top_title}>
                      <Image src={`/image/icon1.svg`} alt='icon' width={30} height={30}/>
                      <h4>Физический / <span style={{color: "#d34645"}}>Муладхара</span></h4>
                    </div>
                    <div className={style.block_top_precept}>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className={style.block_bottom}>
                    <div className={style.block_bottom_traits}>
                      <span>Иснстинк продолжения рода, уровень страсти</span>
                    </div>
                    <div className={style.block_bottom_result}>
                      <p>Максимум</p>
                      <p>«Я хочу партнёра»</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${style.forecast_blocks} ${style.forecast_blocks_unlock}`}>
            <div className={style.forecast_info}>
              <div className={style.forecast_age}>
                <span>Личностные качества</span>
              </div>
              <div className={style.forecast_status}>
                <span>Блок недоступен</span>
                <Image src={'/image/close.svg'} width={24} height={24} alt='close' />
              </div>
            </div>
          </div>
          <div className={`${style.forecast_blocks} ${style.forecast_blocks_unlock}`}>
            <div className={style.forecast_info}>
              <div className={style.forecast_age}>
                <span>Для чего встретились</span>
              </div>
              <div className={style.forecast_status}>
                <span>Блок недоступен</span>
                <Image src={'/image/close.svg'} width={24} height={24} alt='close' />
              </div>
            </div>
          </div>
          <div className={`${style.forecast_blocks} ${style.forecast_blocks_unlock}`}>
            <div className={style.forecast_info}>
              <div className={style.forecast_age}>
                <span>Карма отношений</span>
              </div>
              <div className={style.forecast_status}>
                <span>Блок недоступен</span>
                <Image src={'/image/close.svg'} width={24} height={24} alt='close' />
              </div>
            </div>
          </div>
          <div className={`${style.forecast_blocks} ${style.forecast_blocks_unlock}`}>
            <div className={style.forecast_info}>
              <div className={style.forecast_age}>
                <span>Как проявляется пара</span>
              </div>
              <div className={style.forecast_status}>
                <span>Блок недоступен</span>
                <Image src={'/image/close.svg'} width={24} height={24} alt='close' />
              </div>
            </div>
          </div>
          <div className={`${style.forecast_blocks} ${style.forecast_blocks_unlock}`}>
            <div className={style.forecast_info}>
              <div className={style.forecast_age}>
                <span>Энергия по годам</span>
              </div>
              <div className={style.forecast_status}>
                <span>Блок недоступен</span>
                <Image src={'/image/close.svg'} width={24} height={24} alt='close' />
              </div>
            </div>
          </div>
        </div>
        <Tariffs />
      </div>
    </main>
  )
}

export default matrix