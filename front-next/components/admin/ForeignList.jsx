import React from "react";
import { useSelector } from "react-redux";

import styles from '../../styles/admin/admin.module.scss';

const ListByLang = ({ list }) => {
  return (
    <div className={styles.list}>
      {list?.map(v => <button>[ { v.email } ] { v.name }</button>)}
    </div>
  )
}

const ForeignList = () => {
  const { foreignList } = useSelector(state => state?.user);

  return (
    <div className={styles.listWrap}>
      <div>
        <label htmlFor="">영어</label>
        <ListByLang list={foreignList.filter(v => v.position === 'en')}/>
      </div>
      <div>
        <label htmlFor="">일본어</label>
        <ListByLang list={foreignList.filter(v => v.position === 'ja')}/>
      </div>
      <div>
        <label htmlFor="">중국어</label>
        <ListByLang list={foreignList.filter(v => v.position === 'ch')}/>
      </div>
    </div>
  )
}

export default ForeignList;
