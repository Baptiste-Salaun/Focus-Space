import { useState } from 'react';
import Button from '../elements/SimpleButton';
import styles from './Pomodoro.module.css';
import SimpleButton from '../elements/SimpleButton';

function Pomodoro(){
    const [state, setState] = useState('selection');
    const [duration, setDuration] = useState(null);
    let initialTime = 0;

    function startTimer(time){
        setState('timer')
        if(time === '25-5'){
            setDuration(25)
        }
        if(time === '50-10'){
            setDuration(50)
        }
    }

    if(state==='selection'){
        return(
            <div className={styles.timeSelection}>
                <SimpleButton onClick={() => startTimer('25-5')} content="25-5min" color="primary"/>
                <SimpleButton onClick={() => startTimer('50-10')}content="50-10min" color="primary" />
            </div>
        );
    }
    if(state==='timer'){
        return(
            <p>Timer</p>
        );
    }

}
export default Pomodoro;