import React from 'react';

import TimeLine from '../../componets/time-line/time-line.component';

import styles from './about-us.module.scss';

const AboutUs = () => {

  const clickBtn = (e) => {
    let openedBlock = e.target.parentElement;
    let hiddenText = e.target.nextSibling;
    if (hiddenText.style.height) {
      hiddenText.style.height = null;
      if (document.documentElement.clientWidth > 1200) {
        openedBlock.style.marginBottom = '2rem';
        e.target.style.bottom = '-20px';
      } else {
        e.target.style.bottom = 0;
      }
    } else {
      hiddenText.style.height = hiddenText.scrollHeight + 'px';
      if (document.documentElement.clientWidth > 1200) {
        openedBlock.style.marginBottom = 0;
        e.target.style.bottom = hiddenText.scrollHeight - 20 + 'px';
      } else {
        e.target.style.bottom = hiddenText.scrollHeight - 10 + 'px';
      }
      openedBlock.style.marginBottom = 0;
      
    }
  }

  return(
    <div className={styles.wrapper}>
      <h1>НАША ІСТОРІЯ</h1>
      <div className={styles.wrapper__content}>
        <TimeLine/>
        <img src={require('../../assets/create_farm.png')} alt="Main Logo" className={styles.wrapper__content__main_logo}/>
        <div className={styles.wrapper__content__info}>
          <div className={styles.wrapper__content__info__blocks}>
            <div className={styles.wrapper__content__info__blocks__additional_block}>
              <div className={styles.wrapper__content__info__blocks__additional_block__block}>
                <img src={require('../../assets/create_farm.png')} alt='TURKEY'/>
                <p>
                  <span className={styles.wrapper__content__info__blocks__additional_block__block__date}>30 березня 2012</span><br></br>
                  <span>Створено<br></br> ТОВ "М’ясник Прикарпаття"</span>
                </p>
              </div>
              <div className={styles.wrapper__content__info__blocks__additional_block__btn_open_hidden} onClick={clickBtn}></div>
              <div className={styles.wrapper__content__info__blocks__additional_block__hidden_text}>
                <p>В червні 2013 року було введено в експлуатацію комбікормовий завод потужністю 4 тн/год, який було змонтовано з використанням вітчизняного обладнання.</p>
                <p> Це дало можливість знизити собівартість кінцевого продукту,адже частка комбікормів у собівартості м’яса становить близько 60 відсотків.</p>
              </div>
            </div>
            
            <div className={styles.wrapper__content__info__blocks__additional_block}>
              <div className={styles.wrapper__content__info__blocks__additional_block__block}>
                <img src={require('../../assets/combicorm.png')} alt='farmacy'/>
                <p>
                  <span className={styles.wrapper__content__info__blocks__additional_block__block__date}>Червень 2013</span><br></br>
                  <span>Введено в експлуатацію<br></br> комбікормовий завод</span>
                </p>
              </div>
              <div className={styles.wrapper__content__info__blocks__additional_block__btn_open_hidden} onClick={clickBtn}></div>
              <div className={styles.wrapper__content__info__blocks__additional_block__hidden_text}>
                <p>В червні 2013 року було введено в експлуатацію комбікормовий завод потужністю 4 тн/год, який було змонтовано з використанням вітчизняного обладнання.</p>
                <p> Це дало можливість знизити собівартість кінцевого продукту,адже частка комбікормів у собівартості м’яса становить близько 60 відсотків.</p>
              </div>
            </div>

            <div className={styles.wrapper__content__info__blocks__additional_block}>
              <div className={styles.wrapper__content__info__blocks__additional_block__block}>
                <img src={require('../../assets/turkey_icon.png')} alt='turkey'/>
                <p>
                  <span className={styles.wrapper__content__info__blocks__additional_block__block__date}>Вересень 2017</span><br></br>
                  <span>Вирощено<br></br> першу власну птицю</span>
                </p>
              </div>
              <div className={styles.wrapper__content__info__blocks__additional_block__btn_open_hidden} onClick={clickBtn}></div>
              <div className={styles.wrapper__content__info__blocks__additional_block__hidden_text}>
                <p>В червні 2013 року було введено в експлуатацію комбікормовий завод потужністю 4 тн/год, який було змонтовано з використанням вітчизняного обладнання.</p>
                <p> Це дало можливість знизити собівартість кінцевого продукту,адже частка комбікормів у собівартості м’яса становить близько 60 відсотків.</p>
              </div>
            </div>

            <div className={styles.wrapper__content__info__blocks__additional_block}>
              <div className={styles.wrapper__content__info__blocks__additional_block__block}>
                <img src={require('../../assets/build.png')} alt='build'/>
                <p>
                  <span className={styles.wrapper__content__info__blocks__additional_block__block__date}>Червень 2018</span><br></br>
                  <span>Збудовано<br></br> власний забійний цех</span>
                </p>
              </div>
              <div className={styles.wrapper__content__info__blocks__additional_block__btn_open_hidden} onClick={clickBtn}></div>
              <div className={styles.wrapper__content__info__blocks__additional_block__hidden_text}>
                <p>В червні 2013 року було введено в експлуатацію комбікормовий завод потужністю 4 тн/год, який було змонтовано з використанням вітчизняного обладнання.</p>
                <p> Це дало можливість знизити собівартість кінцевого продукту,адже частка комбікормів у собівартості м’яса становить близько 60 відсотків.</p>
              </div>
            </div>

            <div className={styles.wrapper__content__info__blocks__additional_block}>
              <div className={styles.wrapper__content__info__blocks__additional_block__block}>
                <img src={require('../../assets/HACCP.png')} alt='HACCP'/>
                <p>
                  <span className={styles.wrapper__content__info__blocks__additional_block__block__date}>Вересень 2018</span><br></br>
                  <span>Сертифіковано<br></br> у системі HACCP</span>
                </p>
              </div>
              <div className={styles.wrapper__content__info__blocks__additional_block__btn_open_hidden} onClick={clickBtn}></div>
              <div className={styles.wrapper__content__info__blocks__additional_block__hidden_text}>
                <p>В червні 2013 року було введено в експлуатацію комбікормовий завод потужністю 4 тн/год, який було змонтовано з використанням вітчизняного обладнання.</p>
                <p> Це дало можливість знизити собівартість кінцевого продукту,адже частка комбікормів у собівартості м’яса становить близько 60 відсотків.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  };

export default AboutUs;