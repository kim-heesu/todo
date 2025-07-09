import axios from 'axios';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

import Content from '../components/content/Content';
import ContentSm from '../components/content/ContentSm';
import ModalWork from '../components/modal/ModalAddWork';
import ModalAddSchedule from '../components/modal/ModalAddSchedule'
import ModalReadSchedule from '../components/modal/ModalReadSchedule'

function TodayPage() {
    const userInfoParam = useSelector((state: RootState) => state.userDTO);
    const [todayList,setTodayList] = useState([]);

    useEffect(() => {
    axios.get(`/api/v1/board/find-all-todo?userId=${userInfoParam.id}`)
    .then((res) => {
        console.log(res.data);
        setTodayList(res.data.todoBoardDTOList); 
    })
    .catch((err) => {
        console.error('에러 발생:', err);
    });
    }, [userInfoParam]);


    const workList = [
        {
            title:'Work책상정리',
            date : '2025-06-20 15:00:00',
            content: '책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다.'
        },
        {
            title:'Work책상정리',
            date : '2025-06-20 15:00:00',
            content: '책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다.'
        },
    ]
    return (
        <>  
            <Content title="Today" btnTxt="Add +" modalTitle="일정 추가" modalSize="md" alarm={99999} list={todayList}>
                <ModalAddSchedule />
                <ModalReadSchedule />
            </Content>

            <ContentSm title="Work Space" btnTxt="Add +" modalTitle="방 만들기" modalSize="sm" list={workList}>
                <ModalWork />
            </ContentSm>
        </>
    );
}

export default TodayPage;
