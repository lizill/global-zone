import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import axios from 'axios';
import FadeLoader from "react-spinners/FadeLoader";

const style = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const Google = () => {
  const router = useRouter();

  useEffect(() => {
    axios.get('/google/callback' + router.asPath.substring(7))
      .then((res) => {
        if (res.data.user.position === 'admin') {
          Router.push('/admin');
        } else {
          Router.push('/');
        }
      })
      .catch((err) => {
        console.error(err)
        if (err.response.status === 403) {
          alert('@g.yju.ac.kr로 끝나는 G-suite 계정만 사용이 가능합니다.');
          Router.push('/korean');
        }
      })
  }, []);

  return (
      <div style={style}>
        <FadeLoader color={"#182f9e"} loading={true}/>
      </div>
  )
}

export default Google;
