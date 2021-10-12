import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import axios from 'axios';

const Google = () => {
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:8000/api/google/callback' + router.asPath.substring(7))
      .then((res) => {
        console.log(res.data);
        Router.push('/')
      })
      .catch(err => console.error(err))
  }, []);

  return <p>Loading...</p>
}

export default Google;
