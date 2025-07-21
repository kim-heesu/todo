import { useState, useCallback, useEffect } from 'react';

function useVerifi(initValue: string) {
    const [MSG, setMSG] = useState(initValue);
    const [status, setStatus] = useState<'normal' | 'error' | null>(null);

    // 여기를 <HTMLInputElement | null> 로 바꾸고 초기값 null 로 둠
    const [msgRef, setMsgRef] = useState<React.RefObject<HTMLInputElement | null> | null>(null);
    const [focusRef, setFocusRef] = useState<React.RefObject<HTMLInputElement | null> | null>(null);

    const setError = useCallback((
        inputRef: React.RefObject<HTMLInputElement | null> | null,
        messageRef: React.RefObject<HTMLInputElement | null> | null,
        message: string
    ) => {
        setMSG(message);
        setStatus('error');
        setMsgRef(messageRef);
        setFocusRef(inputRef);
    }, []);

    const setNormal = useCallback((
        messageRef: React.RefObject<HTMLInputElement | null> | null,
        message: string
    ) => {
        setMSG(message);
        setStatus('normal');
        setMsgRef(messageRef);
    }, []);

    const clearError = useCallback((
        messageRef: React.RefObject<HTMLInputElement | null> | null
    ) => {
        setMSG('');
        setStatus(null);
        setMsgRef(messageRef);
    }, []);

    useEffect(() => {
        if (!msgRef?.current) return;

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
            element.classList.remove('error');
        });
        if (focusRef?.current) {
            focusRef.current.focus();
            focusRef.current.classList.add('error');
        }
    }, [focusRef]);

    return { MSG, setError, setNormal, clearError };
}

export default useVerifi;
