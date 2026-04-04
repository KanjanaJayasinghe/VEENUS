import { getOrders } from '@/lib/firestore';
import OrderDetailClient from './OrderDetailClient';

export async function generateStaticParams() {
  try {
    const orders = await getOrders();
    if (orders.length > 0) {
      return orders.map((o) => ({ id: o.id }));
    }
  } catch {}
  return [{ id: 'placeholder' }];
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return <OrderDetailClient params={params} />;
}
