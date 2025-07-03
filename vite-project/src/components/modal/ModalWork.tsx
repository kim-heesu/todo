import ModalBody from './ModalBody';
import ModalBottom from './ModalBottom';
import ToggleInput from '../items/ToggleInputView';

function ModalSchedule(){
    return (
        <>
            <ModalBody>
                <form>
                    <ul>
                        <li>
                            <ToggleInput inputTitle="방 이름" placeholder="방 이름을 입력하세요." id=""></ToggleInput>
                        </li>
                    </ul>
                    <ModalBottom>
                        <button type="submit" className="btn-yellow">Add +</button>
                    </ModalBottom>
                </form>
            </ModalBody>
        </>
    )
}

export default ModalSchedule;