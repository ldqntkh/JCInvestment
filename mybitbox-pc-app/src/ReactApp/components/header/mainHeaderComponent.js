import React from 'react';
import PropTypes from 'prop-types'


const MainHeaderComponent = ({screen}) => {
    let title = '';

    switch(screen) {
        case 'mywallet': title = 'My Wallet'; break;
        case 'myearning': title = 'My Earning'; break;
        case 'mybitbox': title = 'myBitbox'; break;
        case 'setting': title = 'Setting'; break;
    }
    return (
        <header>
            <h1> { title }</h1>
            <img onClick={()=> {
                closeWindow();
            }} src='../public/images/close.png' />
        </header>
    )
}

MainHeaderComponent.PropTypes = {
    screen : PropTypes.string.isRequired
}
export default MainHeaderComponent;