import React from 'react';
import PropTypes from 'prop-types'


const MainFooterComponent = ({screen, toggleScreen}) => {
    return (
        <footer>
            <div className="dv-ft-button">
                <div>
                    <div className={screen == 'mywallet' ? 'active' : ''} onClick={()=> toggleScreen('mywallet')}>
                        <img src="../public/images/wallet.jpg"/>
                        <span>My Wallet</span>
                    </div>
                </div>
                <div>
                    <div className={screen == 'myearning' ? 'active' : ''} onClick={()=> toggleScreen('myearning')}>
                        <img src="../public/images/earning.jpg"/>
                        <span>My Earning</span>
                    </div>
                </div>
                <div>
                    <div className={screen == 'mybitbox' ? 'active' : ''} onClick={()=> toggleScreen('mybitbox')}>
                        <img src="../public/images/box.jpg"/>
                        <span>myBitbox</span>
                    </div>
                </div>
                <div>
                    <div className={screen == 'setting' ? 'active' : ''} onClick={()=> toggleScreen('setting')}>
                        <img src="../public/images/setting.jpg"/>
                        <span>Setting</span>
                    </div>
                </div>
            </div>
            <div className="dv-ft-link">
                <a href="#">https://myBitbox888.com</a>
            </div>
        </footer>
    )
}

MainFooterComponent.PropTypes = {
    screen : PropTypes.string.isRequired,
    toggleScreen: PropTypes.func.isRequired
}
export default MainFooterComponent;