import ModalBody from './ModalBody';
import ModalBottom from './ModalBottom';
import Input from '../items/Input';

function ModalSchedule(){
    return (
        <>
            <ModalBody>
                <form>
                    <ul>
                        <li>
                            <Input inputTitle="라벨1" placeholder="텍스트입력하세요1" id="inputId01"></Input>
                        </li>
                        <li>
                            <Input inputTitle="라벨2" placeholder="텍스트입력하세요2" id="inputId02"></Input>
                        </li>
                        <li>
                            <Input inputTitle="라벨3" placeholder="텍스트입력하세요3" id="inputId03"></Input>
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