// 브라우저 창 크기에 따라 media 타입을 반환하는 훅
// 1024이상 = mediaPC, 1024 이하 mediaTablet, 380이하 mediaMobile
import { useState,useEffect } from "react";
function useMediaQuery(){
    const [media,setMedia] = useState('mediaPC');
    const [size,setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(()=>{
        const handleSize = ()=>{
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        
        window.addEventListener('resize',handleSize);

        return () => {
            window.removeEventListener('resize',handleSize);
        }
    },[]);

    useEffect(() => {
        if (size.width >= 1024) {
            setMedia('mediaPC');
        } else if (size.width >= 380) {
            setMedia('mediaTablet');
        } else {
            setMedia('mediaMobile');
        }
    }, [size.width]);

    return media
}

export default useMediaQuery;