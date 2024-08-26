import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';
import '../DarkModeSwitch/DarkModeSwitch.css';

const DarkModeSwitch = () => {
    const dispatch = useDispatch();
    // Accede a la propiedad theme en el estado
    const theme = useSelector((state) => state.theme.theme);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <label htmlFor="switch" className="switch">
            <input
                id="switch"
                type="checkbox"
                checked={theme === 'light'}
                onChange={handleToggle}
            />
            <span className="sliding"></span>
            <span className="decoration"></span>
        </label>
    );
};

export default DarkModeSwitch;
