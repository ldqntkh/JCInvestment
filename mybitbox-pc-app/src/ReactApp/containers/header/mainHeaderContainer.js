import { connect } from 'react-redux'
import MainHeaderComponent from '../../components/header/mainHeaderComponent';

const mapStateToProps = state => ({
    screen: state.MainScreenReducer
});

export default connect(
    mapStateToProps,
)(MainHeaderComponent)