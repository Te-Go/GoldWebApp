
import { useParams, useNavigate } from 'react-router-dom';
import { newsData } from '../data/newsData';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import './ArticlePage.css';

// Simple Markdown-to-React Parser
const parseContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
        // Headers
        if (line.startsWith('## ')) return <h2 key={idx}>{line.replace('## ', '')}</h2>;
        if (line.startsWith('### ')) return <h3 key={idx}>{line.replace('### ', '')}</h3>;

        // Lists
        if (line.startsWith('* ')) return <li key={idx}>{line.replace('* ', '')}</li>;

        // Bold Text (Basic implementation: splits by **)
        if (line.includes('**')) {
            const parts = line.split('**');
            return (
                <p key={idx}>
                    {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
                </p>
            );
        }

        // Empty lines
        if (line.trim() === '') return null;

        // Regular Paragraphs
        return <p key={idx}>{line}</p>;
    });
};

export const ArticlePage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const article = newsData.find(a => a.slug === slug);

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center text-muted">
                <h2 className="text-2xl font-bold mb-4">Makale Bulunamadı</h2>
                <button onClick={() => navigate('/news')} className="btn btn-ghost">
                    <ArrowLeft size={16} /> Haberlere Dön
                </button>
            </div>
        );
    }

    return (
        <article className="article-page">
            {/* Immersive Header */}
            <div className="article-header">
                <img src={article.imageUrl} alt={article.title} className="article-bg" />
                <div className="article-overlay">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="badge badge-gold mb-4 text-sm px-3 py-1">
                            {article.category === 'education' ? 'EĞİTİM REHBERİ' : 'PİYASA ANALİZİ'}
                        </span>
                        <h1 className="article-title">{article.title}</h1>

                        <div className="article-meta-row">
                            <span className="meta-item"><User size={16} /> {article.author}</span>
                            <span className="meta-item"><Calendar size={16} /> {article.publishDate}</span>
                            <span className="meta-item"><Clock size={16} /> {article.readTime} dk okuma</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Body */}
            <div className="article-content">
                <div className="article-body">
                    {parseContent(article.content)}
                </div>

                {/* Footer Actions */}
                <div className="mt-16 pt-8 border-t border-[var(--border-subtle)]">
                    <p className="text-center text-muted mb-6 text-sm">Bu makaleyi faydalı buldunuz mu? Paylaşın:</p>
                    <div className="flex justify-center gap-4 mb-12">
                        <button className="btn btn-ghost p-3 rounded-full"><Twitter size={20} /></button>
                        <button className="btn btn-ghost p-3 rounded-full"><Linkedin size={20} /></button>
                        <button className="btn btn-ghost p-3 rounded-full"><Facebook size={20} /></button>
                    </div>
                </div>
            </div>

            {/* Floating Share Button (Mobile) */}
            <motion.button
                className="share-action"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Paylaş"
            >
                <Share2 size={24} />
            </motion.button>
        </article>
    );
};
