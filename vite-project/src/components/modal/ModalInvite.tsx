import ModalBody from './ModalBody';
import ModalBottom from './ModalBottom';
import InputItem from '../items/Input';


function ModalInvite(){
    return (
        <>
            <ModalBody>
                <form>
                    <ul>
                        <li>
                            <InputItem inputTitle="이메일 검색" placeholder="이메일을 입력하여 검색해보세요." id=""></InputItem>
                        </li>
                    </ul>
                    <ModalBottom>
                        <button type="submit" className="btn-point">invite +</button>
                    </ModalBottom>
                </form>
            </ModalBody>
        </>
    )
}

export default ModalInvite;