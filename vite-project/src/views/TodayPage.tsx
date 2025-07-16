import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { setModalState } from '../store/slices/modalToggleSlice';
import type { RootState } from '../store/store';

import axios from 'axios';

import Content from '../components/content/Content';
import ContentSm from '../components/content/ContentSm';
import ModalWork from '../components/modal/ModalAddWork';
import ModalAddSchedule from '../components/modal/ModalAddSchedule'
import ModalReadSchedule from '../components/modal/ModalReadSchedule'

function TodayPage() {
    // 유저정보
    const userInfoParam = useSelector((state: RootState) => state.userDTO);
    const queryClient = useQueryClient();

    //Todo 리스트
    const {data:todayList =[]} = useQuery({
        queryKey: ['todayTodo',userInfoParam.id],
        queryFn: async () => {
            const res = await axios.get(`/api/v1/board/find-all-todo?userId=${userInfoParam.id}`);
            console.log(res.data)
            return res.data.todoBoardDTOList
        },
        enabled: !!userInfoParam.id
    });

    // todo 일정추가
    const modalDispatch = useDispatch();

    const addTodoMutation = useMutation({
        mutationFn: (params: any) => axios.post('/api/v1/board/add-todo', params),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['todayTodo',userInfoParam.id]});
        },
    });
    const handleAddTodo = (params:any) => {
        addTodoMutation.mutate(params);
        modalDispatch(setModalState(false))
    }

    // Todo 디테일
    // 리스트 클릭시 해당하는 item.id 와 맞는 내용을 넣기 위해 필터 후 todoDetail로 전달
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const todoDetail = useMemo(() => {
        return todayList.find((item: any) => item.id === selectedId);
    }, [selectedId, todayList]);

    const workList = [
        {
            id:1,
            todoDate : '2025-06-20 15:00:00',
            description: 'Work책상정리<hr><p class="quill-text">책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다.</p>'
        },
        {
            id:2,
            todoDate : '2025-06-20 15:00:00',
            description: 'Work책상정리<hr><p class="quill-text">책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다.</p>'
        },
    ]
    return (
        <>  
            <Content title="Today" btnTxt="Add +" modalTitle="일정 추가" modalReadTitle="일정" modalSize="md" alarm={99999} list={todayList} onRead={(id) => { console.log('자식에서 전달된 읽기 ID:', id); setSelectedId(id); }}>
                <ModalAddSchedule onAddTodo={handleAddTodo}/>
                <ModalReadSchedule todoDetail={todoDetail}/>
            </Content>

            <ContentSm title="Work Space" btnTxt="Add +" modalTitle="방 만들기" modalSize="sm" list={workList}>
                <ModalWork/>
            </ContentSm>
        </>
    );
}

export default TodayPage;
