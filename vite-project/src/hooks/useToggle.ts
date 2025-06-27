import {useState, useCallback } from 'react';

function useToggle(initValue = false) {
    const [state, setState] = useState(initValue);
    
    const toggle = useCallback(()=>{
        setState(prevState => !prevState);
    },[]);

    return [state,toggle] as const;
}

export default useToggle;