import {Link} from 'react-router-dom';

function Gnb() {
    return (
        <nav>
            <Link to='/'>Today</Link>
            <Link to='/workspace'>WorkSpace</Link>
        </nav>
    )
}

export default Gnb;