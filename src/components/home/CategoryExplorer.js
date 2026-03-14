'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getCategoriesWithImages } from '@/data/collections';
import styles from './CategoryExplorer.module.css';

export default function CategoryExplorer() {
    const categories = getCategoriesWithImages();

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>SHOP BY CATEGORY</h2>
                <div className={styles.grid}>
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={`/collections/${cat.slug}`} className={styles.card}>
                                <motion.div 
                                    className={styles.cardInner}
                                    whileHover={{ y: -5, backgroundColor: "#222" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <h3 className={styles.cardTitle}>{cat.title}</h3>
                                    <p className={styles.cardDescription}>{cat.description}</p>
                                    <div className={styles.cardBg} />
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
