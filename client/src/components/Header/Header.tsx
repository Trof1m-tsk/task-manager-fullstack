import {useState} from 'react';
import CreationDialog from "../CreationDialog";
import Button from "../Button";
import {useLocation, useNavigate} from "react-router-dom";
import './styles.scss'

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const createTaskHandler = () => {
    navigate('/tasks/new')
  }

  const goToTableHandler = () => {
    navigate('/tasks')
    console.log(location);
  }

  const isTablePage = location.pathname === '/tasks';

  return (
    <div className='header'>
      <div
        className='header-grid'>
        <div className='h-full flex items-center'>
          {!isTablePage &&
            // ? <Button view='primary' onClick={createTaskHandler} text='Create task'/>
            <Button view='primary' onClick={goToTableHandler} text='&#8592; Back'/>
          }
        </div>
        <h1 className='header-title'>Task manager</h1>
        <div className='header-login-area'>
          <p>Tytaj bedze login</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
