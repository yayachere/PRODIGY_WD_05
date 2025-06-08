import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import CloudsImage  from '../images/clouds.png';

const Navbar = ({isDarkMode,setIsDarkMode}) => {

  return (
    <div className='navbar'>
        <div className="header">
            <img src={CloudsImage} alt="Clouds" className='header-image'/>
            <h1 className='header-text'>Weather App</h1>
        </div>
        <div className="toggle">
            {isDarkMode ?
                <BsToggleOn className='toggle-icon' onClick={(() => setIsDarkMode(false))}/>:
                <BsToggleOff className='toggle-icon' onClick={(() => setIsDarkMode(true))}/>
            }
        </div>
    </div>
  )
}

export default Navbar