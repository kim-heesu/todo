import ModalBody from './ModalBody';
import ModalBottom from './ModalBottom';
import InputItem from '../items/Input';
import styled from 'styled-components';
const Label = styled.label`
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.6rem;
    font-weight: 800;
`;
function ModalSchedule(){
    return (
        <>
            <ModalBody>
                <form>
                    <ul>
                        <li>
                            <InputItem inputTitle="일정dd 이름" txtType="read" placeholder="" id=""></InputItem>
                        </li>
                        <li>
                            <InputItem inputTitle="날짜" txtType="read" placeholder="" id=""></InputItem>
                        </li>
                        <li>
                            <Label>내용</Label>
                            <div>
                                일정내용이 들어가겠지요
                            </div>
                        </li>
                    </ul>
                    <ModalBottom>
                        <button type="button" className="btn-point red">Remove</button>
                        <button type="submit" className="btn-point">Add +</button>
                    </ModalBottom>
                </form>
            </ModalBody>
        </>
    )
}

export default ModalSchedule;