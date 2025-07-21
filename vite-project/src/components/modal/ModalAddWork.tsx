import axios from 'axios';
import { useSelector, useDispatch  } from 'react-redux';
import { setModalState } from '../../store/slices/modalToggleSlice';
import useInput from '../../hooks/useInput';
import ModalBody from './ModalBody';
import ModalBottom from './ModalBottom';
import InputItem from '../items/Input';
import type { RootState } from '../../store/store';

function ModalSchedule(){
    const [workName, onWorkName] = useInput('');

    const userDTO = useSelector((state:RootState) => state.userDTO);
    const param = {
        title: workName,
        userId: userDTO.id
    };

    const modalDispatch = useDispatch();
    const createWork = async() => {
        if(workName === ''){
            alert('방이름을 입력해주세요')
            return;
        }
        try {
            const res = await axios.post('/api/v1/workspace/create-workspace',param);
            modalDispatch(setModalState(false))
            console.log('성공',res.data);
        }
        catch (err){
            console.error("에러 발생", err);
        }
    }
    return (
        <>
            <ModalBody>
                <form>
                    <ul>
                        <li>
                            <InputItem inputType='text' inputTitle="방 이름" placeholder="방 이름을 입력하세요." id="workName" value={workName} onChange={onWorkName}></InputItem>
                        </li>
                    </ul>
                    <ModalBottom>
                        <button type="button" className="btn-point" onClick={createWork}>Add +</button>
                    </ModalBottom>
                </form>
            </ModalBody>
        </>
    )
}

export default ModalSchedule;