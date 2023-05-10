import { useProducts } from '@/lib/tq/products/queries';
import { List, ListItem } from '@/components/mui';
import Product from '@/components/Product';

const ProductList = ({ deleteHandler = () => {}, headingLevel = 2 }) => {
  const { data: products } = useProducts();
  return (
    <List component='ol'>
      {products.map((product) => (
        <ListItem key={product._id} component='li'>
          <Product
            product={product}
            deleteHandler={deleteHandler}
            headingLevel={headingLevel}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default ProductList;