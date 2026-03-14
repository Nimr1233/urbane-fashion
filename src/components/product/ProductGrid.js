import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products, columns = 4, title = null }) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {title && <h2 className={styles.title}>{title}</h2>}
                <div className={`${styles.grid} ${styles[`cols${columns}`]}`}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
