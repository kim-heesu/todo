// 상태를 반전시키는 커스텀 훅 (boolean)
// const [상태값, 상태값을변경하는함수] = useToggle(); 처럼 사용

import {useState, useCallback } from 'react';

function useToggle(initValue = false) {
    const [state, setState] = useState(initValue);
    
    const toggle = useCallback(()=>{
        setState(prevState => !prevState);
    },[]);

    return [state,toggle] as const;
}

export default useToggle;