import React, { useState, useMemo } from 'react';
import { Header } from './components/Header.tsx';
import { LeftSidebar } from './components/LeftSidebar.tsx';
import { CentralFeed } from './components/CentralFeed.tsx';
import { RightSidebar } from './components/RightSidebar.tsx';
import { Footer } from './components/Footer.tsx';
import { ReelPlayerModal } from './components/ReelPlayerModal.tsx';
import { ArticleReaderModal } from './components/ArticleReaderModal.tsx';
import { SavedArticlesModal } from './components/SavedArticlesModal.tsx';
import { CreatePostModal } from './components/CreatePostModal.tsx';

import {
  INITIAL_ARTICLES,
  STORY_REELS,
  RESEARCH_PAPERS,
  FEATURED_SCIENTISTS,
  MARKET_COMMODITIES,
} from './data/mockData.ts';
import { Article, ArticleCategory, FeedFilter, Comment, ResearchPaper } from './types/index.ts';
import {
  filterArticles,
  toggleBookmarkId,
  toggleArticleReaction,
  appendArticleComment,
} from './utils/pureLogic.ts';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [reels] = useState(STORY_REELS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('সকল');
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('trending');
  
  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['art-brri-102-haor']);
  
  // Modals & Drawers
  const [activeReadingArticle, setActiveReadingArticle] = useState<Article | null>(null);
  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  // Filtered Articles via pure logic function
  const filteredArticles = useMemo(() => {
    return filterArticles(articles, searchQuery, selectedCategory, activeFilter);
  }, [articles, searchQuery, selectedCategory, activeFilter]);

  // Bookmarked articles list
  const savedArticles = useMemo(() => {
    return articles.filter((a) => bookmarkedIds.includes(a.id));
  }, [articles, bookmarkedIds]);

  // Handlers
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => toggleBookmarkId(prev, id));
  };

  const handleToggleLike = (targetArticle: Article) => {
    const updated = toggleArticleReaction(targetArticle);
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    if (activeReadingArticle && activeReadingArticle.id === updated.id) {
      setActiveReadingArticle(updated);
    }
  };

  const handleAddComment = (articleId: string, newComment: Comment) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? appendArticleComment(a, newComment) : a))
    );
    if (activeReadingArticle && activeReadingArticle.id === articleId) {
      setActiveReadingArticle((prev) => (prev ? appendArticleComment(prev, newComment) : null));
    }
  };

  const handleCreateArticle = (newArticle: Article) => {
    setArticles((prev) => [newArticle, ...prev]);
    setSelectedCategory('সকল');
  };

  const handleOpenResearch = (paper: ResearchPaper) => {
    // Find matching article or open the relevant research article
    const match = articles.find((a) => a.id.includes(paper.institutionCode.toLowerCase())) || articles[0];
    setActiveReadingArticle(match);
  };

  const handleSelectTag = (tag: string) => {
    const cleanTag = tag.replace(/_/g, ' ');
    setSearchQuery(cleanTag);
    setSelectedCategory('সকল');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToReels = () => {
    const el = document.getElementById('reels-carousel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFAF5] text-[#04301F] selection:bg-[#04301F] selection:text-[#FDFAF4] font-sans">
      {/* 1. Header Bar */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        savedCount={savedArticles.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenNewPost={() => setIsCreatePostOpen(true)}
      />

      {/* 2. Main 3-Column Responsive Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex-1 w-full flex items-start gap-6 lg:gap-8">
        {/* Left Sidebar (Desktop only) */}
        <LeftSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSearchQuery('');
          }}
          savedCount={savedArticles.length}
          onOpenSaved={() => setIsSavedDrawerOpen(true)}
          onScrollToReels={handleScrollToReels}
          onOpenEditorialPolicy={() => {
            setActiveReadingArticle(articles[0]);
          }}
        />

        {/* Central Content Feed */}
        <CentralFeed
          articles={filteredArticles}
          reels={reels}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSearchQuery('');
          }}
          onOpenArticle={(art) => setActiveReadingArticle(art)}
          onOpenReel={(id) => setActiveReelId(id)}
          onOpenCreatePost={() => setIsCreatePostOpen(true)}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={handleToggleBookmark}
          onToggleLike={handleToggleLike}
          onAddComment={handleAddComment}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* Right Sidebar (Desktop xl only) */}
        <RightSidebar
          researchPapers={RESEARCH_PAPERS}
          scientists={FEATURED_SCIENTISTS}
          marketData={MARKET_COMMODITIES}
          onOpenResearch={handleOpenResearch}
          onSelectTag={handleSelectTag}
        />
      </div>

      {/* 3. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCreatePost={() => setIsCreatePostOpen(true)}
      />

      {/* 4. Modals & Drawers */}
      <ArticleReaderModal
        article={activeReadingArticle}
        onClose={() => setActiveReadingArticle(null)}
        isBookmarked={activeReadingArticle ? bookmarkedIds.includes(activeReadingArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onToggleLike={handleToggleLike}
        onAddComment={handleAddComment}
      />

      <ReelPlayerModal
        reels={reels}
        activeReelId={activeReelId}
        onClose={() => setActiveReelId(null)}
      />

      <SavedArticlesModal
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArticles={savedArticles}
        onOpenArticle={(art) => setActiveReadingArticle(art)}
        onRemoveBookmark={handleToggleBookmark}
      />

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmitArticle={handleCreateArticle}
      />
    </div>
  );
}
