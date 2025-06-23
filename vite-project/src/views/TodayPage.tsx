import Title from '../components/Title';
import Modal from '../components/modal/ModalWrap';
import ModalWork from '../components/modal/ModalWork'

function TodayPage() {
    return (
        <>
            <Title title="Today" />
            <Modal size="sm">
                <ModalWork />
            </Modal>
        </>
    );
}

export default TodayPage;
