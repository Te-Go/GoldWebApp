
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Fixed import: useNavigate is here
import { newsData, type Article } from '../data/newsData';
import { Clock, ChevronRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import './NewsPage.css';

export const NewsPage = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<Article['category'] | 'all'>('all');

    const filteredNews = filter === 'all'
        ? newsData
        : newsData.filter(item => item.category === filter);

    // Split into Featured vs Grid
    const featured = filteredNews[0]; // Logic could be smarter (e.g. isFeatured flag)
    const gridItems = filteredNews.slice(1);

    return (
        <div className="news-page">
            <div className="news-header">
                <h1>Haberler & Analiz</h1>
                <p className="news-subtitle">Piyasa nabzı, uzman görüşleri ve eğitim rehberleri.</p>
            </div>

            {/* Category Tabs */}
            <div className="category-tabs">
                {(['all', 'market', 'education', 'news'] as const).map(cat => (
                    <button
                        key={cat}
                        className={`cat-tab ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat === 'all' ? 'Tümü' :
                            cat === 'market' ? 'Piyasa' :
                                cat === 'education' ? 'Eğitim' : 'Haber'}
                    </button>
                ))}
            </div>

            {/* Feature Section (Only show if filtering all or if featured matches filter) */}
            {featured && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="featured-section"
                    onClick={() => navigate(`/news/${featured.slug}`)}
                >
                    <div className="hero-card">
                        <img src={featured.imageUrl} alt={featured.title} className="hero-bg" />
                        <div className="hero-overlay">
                            <span className="hero-tag">Günün Öne Çıkanı</span>
                            <h2 className="hero-title">{featured.title}</h2>
                            <div className="hero-meta">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {featured.publishDate}</span>
                                <span className="flex items-center gap-1"><Clock size={14} /> {featured.readTime} dk okuma</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Grid Section */}
            <div className="news-grid">
                {gridItems.map((article, idx) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="news-card"
                        onClick={() => navigate(`/news/${article.slug}`)}
                    >
                        <div className="card-img-wrapper">
                            <img src={article.imageUrl} alt={article.title} className="card-img" />
                        </div>
                        <div className="card-content">
                            <span className="card-category">
                                {article.category === 'education' ? 'Eğitim' :
                                    article.category === 'market' ? 'Piyasa Analizi' : 'Haber'}
                            </span>
                            <h3 className="card-title">{article.title}</h3>
                            <p className="card-excerpt">{article.excerpt}</p>

                            <div className="card-footer">
                                <span>{article.publishDate}</span>
                                <span className="read-link">Devamını Oku <ChevronRight size={14} /></span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
