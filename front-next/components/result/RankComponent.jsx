import React from "react";
import { useSelector } from 'react-redux';

const RankComponent = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <p>
        {me && me.name} 학생의 2021학년도 2학기<br/>
        글로벌 존 이용 횟수
      </p>
    </div>
  )
}

export default RankComponent;
