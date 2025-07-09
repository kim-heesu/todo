// 입력값검증을 위한 훅
// 에러표현시 : setError(포커스될인풋(ref),에러문구가나올 인풋(ref), 에러문구(string));
// 정상상태 표현시 : setNormal(에러문구가나올 인풋(ref), 에러문구(string))
// 상태 초기화 : clearError()

import { useState, useCallback, useEffect } from 'react';

function useVerifi(initValue: string) {
    const [MSG, setMSG] = useState(initValue);
    const [status, setStatus] = useState<'normal' | 'error' | null>(null);
    const [msgRef, setMsgRef] = useState<React.RefObject<HTMLElement> | null>(null);
    const [focusRef, setFocusRef] = useState<React.RefObject<HTMLElement> | null>(null);

    const setError = useCallback((
        inputRef: React.RefObject<HTMLElement>,
        messageRef: React.RefObject<HTMLElement>,
        message: string
    ) => {
        setMSG(message);
        setStatus('error');
        setMsgRef(messageRef);
        setFocusRef(inputRef); // 포커스 대상 등록만
    }, []);

    const setNormal = useCallback((
        messageRef: React.RefObject<HTMLElement>,
        message: string
    ) => {
        setMSG(message);
        setStatus('normal');
        setMsgRef(messageRef);
    }, []);

    const clearError = useCallback((messageRef: React.RefObject<HTMLElement>) => {
        setMSG('');
        setStatus(null);
        setMsgRef(messageRef);
    }, []);

    useEffect(() => {
        if (!msgRef?.current ) return;

        const msgEl = msgRef.current;
        if (status === 'error') {
            msgEl.classList.add('error');
            msgEl.classList.remove('normal');
        } else if (status === 'normal') {
            msgEl.classList.add('normal');
            msgEl.classList.remove('error');
        } else {
            msgEl.classList.remove('error');
            msgEl.classList.remove('normal');
        }
    }, [msgRef, status]);

    useEffect(() => {
        let AllInput = document.querySelectorAll('input');
        AllInput.forEach(element => {
            element.classList.remove('error')
        });
        if (focusRef?.current) {
            focusRef.current.focus();
            focusRef.current.classList.add('error')
        }
    }, [focusRef]);
    return { MSG, setError, setNormal, clearError };
}

export default useVerifi;
