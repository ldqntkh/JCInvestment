import { connect } from 'react-redux'
import AddProductItemComponent from '../../components/product/addProductItemComponent';
import {
    AddProductItem
} from '../../actions/product/productAction';

const mapStateToProps = state => ({
    dataProduct: state.ProductDataReducer
});

const mapDispatchToProps = dispatch => ({
    addProduct : dataProduct => dispatch(AddProductItem(dataProduct))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddProductItemComponent)