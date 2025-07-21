import { useParams } from 'react-router-dom';
import { useState,  useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { setModalState } from '../store/slices/modalToggleSlice';

import axios from 'axios';

import Content from '../components/content/Content';
import ContentSm from '../components/content/ContentSm';
import ModalInvite from '../components/modal/ModalInvite';
import ModalAddSchedule from '../components/modal/ModalAddSchedule';
import ModalReadSchedule from '../components/modal/ModalReadSchedule';

function WorkPage() {
    // 유저아이디
    const { workspaceId } = useParams();
    const queryClient = useQueryClient();

    // work space todo 리스트
    const {data: findWorkTodo=[]} = useQuery({
        queryKey: ['workTodo', workspaceId],
        queryFn: async()=>{
            const res = await axios.get(`/api/v1/workspace/find-todo-boards?workspaceId=${workspaceId}`);
            console.log(res.data);
            return res.data.todoBoardAndUserDTOList
        },
        enabled: !!workspaceId
    })

    // work space todo 일정추가
    const modalDispatch = useDispatch();

    const addWorkTodoMutation = useMutation({
        mutationFn: (params: any) => axios.post('/api/v1/workspace/make-todo-board', params),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['workTodo', workspaceId]});
        }
    });
    const handleAddWorkTodo = (params: any) => {
        addWorkTodoMutation.mutate(params);
        modalDispatch(setModalState(false))
    }
    
    // findWorkTodo의 결과를 가공해 투두 항목과 멤버 목록으로 분리
    const [workTodoList, setWorkTodoList] = useState<any[]>([]);
    const [workMemlist, setWorkMemList] = useState<any[]>([]);

    useEffect(() => {
        if (findWorkTodo.length === 0) return;

        const todoList = findWorkTodo.map(item => item.todoBoardDTO);
        const memList = findWorkTodo.map(item => item.userDTO);

        setWorkTodoList(todoList);
        setWorkMemList(memList);
    }, [JSON.stringify(findWorkTodo)]); 

    // work space Todo 디테일
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [todoDetail, setTodoDetail] = useState();
    useEffect(()=>{
        if (!selectedId) return;

        const workTodoDetail = workTodoList.find(item => item.id === selectedId );
        setTodoDetail(workTodoDetail);
    },[selectedId,workTodoList])

    // 워크스페이스에 속한 전체멤버   
    const {data: allMem = []} = useQuery({
        queryKey: ['workAllMem',workspaceId],
        queryFn: async() => {
            const res = await axios.get(`/api/v1/workspace/find-all-members?workspaceId=${workspaceId}`);
            console.log(res.data)
            return res.data.userDTOList
        },
        enabled: !!workspaceId
    })
    
    return (
        <>  
            <Content 
            title="Work Space" 
            btnTxt="Add +" 
            modalTitle="일정 추가" 
            modalReadTitle="일정" 
            modalSize="md" 
            alarm={99999} 
            list={workTodoList} 
            workMemlist={workMemlist} 
            onRead={(id) => { setSelectedId(id); }}
            >
                <ModalAddSchedule workspaceId={workspaceId} onAddTodo={handleAddWorkTodo}/>
                <ModalReadSchedule todoDetail={todoDetail}/>
            </Content>

            <ContentSm 
            title="Member" 
            btnTxt="Invite +" 
            modalTitle="멤버 초대" 
            modalSize="sm" 
            AllMemList={allMem}
            >
                <ModalInvite />
            </ContentSm>
        </>
    );
}

export default WorkPage;
