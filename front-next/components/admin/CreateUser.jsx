import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../../reducers/user";

const CreateUser = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [lang, setLang] = useState('');
  const [error, setError] = useState('');
  const { signUpError } = useSelector(state => state.user);

  const onChangeId = (e) => {
    setId(e.target.value);
  }

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  }

  const onChangeSelect = (e) => {
    setLang(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!id) {
      setError('학번을 입력하세요!')
      return
    } else if (!name) {
      setError('이름을 입력하세요!')
      return
    } else if (!lang) {
      setError('언어를 선택해 주세요!')
      return
    } else if (!password) {
      setError('비밀번호를 입력하세요!')
      return
    } else if (password !== passwordCheck) {
      setError('비밀번호와 비밀번호 확인이 서로 다릅니다!')
      return
    }

    let isConfirm = confirm(`
      학번: ${id}\n
      이름: ${name}\n
      언어(나라): ${lang}\n
      위 정보로 계정을 생성 하시겠습니까?
    `);

    if (isConfirm) {
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { email: id, name, password, position: lang }
      });

      setId('');
      setName('');
      setLang('');
      setPassword('');
      setPasswordCheck('');
      setError('');
    }
  }

  return (
    <div>
      create new user
      <form  onSubmit={onSubmit}>
        <label htmlFor="email">학번</label>
        <input id="email" type="text" required value={id} onChange={onChangeId}/><br/>
        <label htmlFor="name">이름</label>
        <input id="name" type="text" required value={name} onChange={onChangeName}/>
        <select onChange={onChangeSelect} value={lang}>
          <option value="" >언어</option>
          <option value="japanese">일본어</option>
          <option value="chinese">중국어</option>
          <option value="american">영어</option>
        </select><br/>
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" min="8" required value={password} onChange={onChangePassword}/><br/>
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <input id="passwordCheck" type="password" min="8" required value={passwordCheck} onChange={onChangePasswordCheck}/><br/>
        
        {error && <p style={{ color: "red" }}>{ error }</p>}
        {signUpError && <p style={{ color: "red" }}>{ signUpError.error }</p>}
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default CreateUser;
