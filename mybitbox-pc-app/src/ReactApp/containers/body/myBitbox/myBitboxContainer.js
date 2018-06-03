import { connect } from 'react-redux'
import MyBitboxComponent from '../../../components/body/myBitbox/myBitboxComponent';
import { ToggleScreen } from '../../../actions/index'

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    toggleScreen: screen => dispatch(ToggleScreen(screen))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyBitboxComponent)