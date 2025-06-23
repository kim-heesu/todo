import Title from '../components/Title';
import Modal from '../components/modal/ModalWrap';
import ModalSchedule from '../components/modal/ModalSchedule'

function TodayPage() {
    return (
        <>
        <Title title="WorkSpace" />
        <Modal size="sm">
            <ModalSchedule />
        </Modal>
        </>
    );
}

export default TodayPage;
