import { Link } from 'react-router-dom';

function Notfoundpage() {
    return (
      <div className="Notfoundpage">
        <h1><Link to='/'>404</Link></h1>
      </div>
    );
}
  
export default Notfoundpage;