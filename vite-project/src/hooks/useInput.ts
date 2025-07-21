// input에 값 입력시 상태가 변경되는 훅
// const [상태값,상태값을 변경하는 함수] = useInput();로 사용
// <Input value={상태값} onChange={함수} />

import { useState, useCallback } from 'react';

function useInput(initValue: string = '') {
    const [state, setState] = useState<string>(initValue);

    const inputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    }, []);

    return [state, inputChange] as const;
}

export default useInput;