import './countryInput.css'
import { Input } from 'antd';
const { Search } = Input;

const CountryInput = ({ setCountry }) => {

    const handleSearch = (value) => {
        setCountry(value)
    }

    return (
        <div className="country_input">
            <Search 
                placeholder="input search text" 
                size="large" 
                onSearch={handleSearch} 
                enterButton 
            />
        </div>
    )
}

export default CountryInput;