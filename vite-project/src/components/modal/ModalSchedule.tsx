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
                            <ToggleInput inputTitle="일정 이름" placeholder="" id=""></ToggleInput>
                        </li>
                        <li>
                            <ToggleInput inputTitle="날짜" placeholder="" id=""></ToggleInput>
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