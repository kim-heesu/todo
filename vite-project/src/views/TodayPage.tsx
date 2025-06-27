
import Content from '../components/content/Content';
import ModalWork from '../components/modal/ModalWork';
import ModalSchedule from '../components/modal/ModalSchedule'

function TodayPage() {
    const testList = {
        title:'Today책상정리',
        date : '2025-06-20 15:00:00',
        content: '책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다.'
    }
    const testList02 = {
        title:'Today책상정리2222',
        date : '2025-06-33 15:00:00',
        content: '책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다. 책상정리를 계속 미뤘다. 이제는 해야한다.'
    }  
    return (
        <>  
            <Content title="Today" btnTxt="Add +" modalTitle="일정 추가" modalSize="md" alarm={99999} list={testList}>
                <ModalSchedule />
            </Content>

            <Content title="Work Space" titleSize="sm" contentSize="sm" btnTxt="Add +" modalTitle="방 만들기" modalSize="sm" list={testList02}>
                <ModalWork />
            </Content>

        </>
    );
}

export default TodayPage;
