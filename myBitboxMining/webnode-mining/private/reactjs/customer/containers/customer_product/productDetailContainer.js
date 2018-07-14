import { connect } from 'react-redux'
import ProductDetailComponent from '../../components/customer_product/productDetailComponent';
import {
    AddListProduct,
    UpdateListProduct
} from '../../actions/customer_product/productAction';

const mapStateToProps = state => ({
    dataProduct : state.ProductDataReducer
});

const mapDispatchToProps = dispatch => ({
    addListProduct: dataProduct => dispatch(AddListProduct(dataProduct)),
    updateListProduct: dataProduct => dispatch(UpdateListProduct(dataProduct))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailComponent)