import Content from '../components/content/Content';
import ModalInvite from '../components/modal/ModalInvite';
import ModalSchedule from '../components/modal/ModalSchedule'

function WorkPage() {
    const testList = {
        title:'Work책상정리',
        date : '2025-06-20 15:00:00',
        content: '책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다.'
    }
    const testList02 = {
        title:'Work책상정리22',
        date : '2025-06-33 15:00:00',
        content: '책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다.'
    }
    return (
        <>
            <Content title="Work Space" btnTxt="Add +" modalTitle="일정 추가" modalSize="md" alarm={99999} list={testList}>
                <ModalSchedule />
            </Content>

            <Content title="Member" titleSize="sm" contentSize="sm" btnTxt="Invite +" modalTitle="멤버 초대" modalSize="sm" list={testList02}>
                <ModalInvite />
            </Content>
        </>
    );
}

export default WorkPage;
