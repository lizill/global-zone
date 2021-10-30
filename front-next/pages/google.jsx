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
      .catch(err => console.error(err))
  }, []);

  return (
      <div style={style}>
        <FadeLoader color={"#182f9e"} loading={true}/>
      </div>
  )
}

export default Google;
