import Content from '../components/content/Content';
import ContentSm from '../components/content/ContentSm';
import ModalInvite from '../components/modal/ModalInvite';
import ModalAddSchedule from '../components/modal/ModalAddSchedule';
import ModalReadSchedule from '../components/modal/ModalReadSchedule';

function WorkPage() {
    const testList = [
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
    const workMemlist = [
        {
            profileSrc: 'test.png',
            name: '영희'
        },
        {
            profileSrc: 'test.png',
            name: '철수'
        }
    ]
    const AllMemList = [
        {
            profileSrc: 'test.png',
            name: '영희'
        },
        {
            profileSrc: 'test.png',
            name: '철수'
        },        {
            profileSrc: 'test.png',
            name: '영희'
        },
        {
            profileSrc: 'test.png',
            name: '철수'
        },        {
            profileSrc: 'test.png',
            name: '영희'
        },
        {
            profileSrc: 'test.png',
            name: '철수'
        },        {
            profileSrc: 'test.png',
            name: '영희'
        },
        {
            profileSrc: 'test.png',
            name: '철수'
        },        {
            profileSrc: 'test.png',
            name: '영희'
        },
        {
            profileSrc: 'test.png',
            name: '철수'
        },
    ]
    
    return (
        <> 
            <Content title="Work Space" btnTxt="Add +" modalTitle="일정 추가" modalSize="md" alarm={99999} list={testList} workMemlist={workMemlist}>
                <ModalAddSchedule />
                <ModalReadSchedule />
            </Content>

            <ContentSm title="Member" btnTxt="Invite +" modalTitle="멤버 초대" modalSize="sm" AllMemList={AllMemList}>
                <ModalInvite />
            </ContentSm>
        </>
    );
}

export default WorkPage;
