import ProductEditClient from './ProductEditClient';

export default function EditProductPage({ params }: { params: { slug: string } }) {
  return <ProductEditClient params={params} />;
}
