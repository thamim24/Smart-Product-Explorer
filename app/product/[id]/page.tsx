import { Metadata } from 'next';
import { fetchProductById } from '@/lib/api';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
import Footer from '@/components/Footer';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const product = await fetchProductById(resolvedParams.id);
    return {
      title: `${product.title} - Smart Product Explorer`,
      description: product.description,
    };
  } catch {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for could not be found.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  
  try {
    const product = await fetchProductById(resolvedParams.id);
    
    return (
      <main>
        <ProductDetails product={product} />
        <Footer />
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--text)] mb-4">Product Not Found</h1>
          <p className="text-[var(--text-secondary)] mb-6">
            The product you are looking for could not be found.
          </p>
          <a
            href="/"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Back to Products
          </a>
        </div>
      </main>
    );
  }
}