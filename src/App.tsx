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
import { FacebookCreatePostModal } from './components/FacebookCreatePostModal.tsx';
import { AskAIModal } from './components/AskAIModal.tsx';

import {
  INITIAL_ARTICLES,
  STORY_REELS,
  RESEARCH_PAPERS,
  FEATURED_SCIENTISTS,
  MARKET_COMMODITIES,
  COMMUNITY_POSTS,
  TOPIC_STORIES,
} from './data/mockData.ts';
import { Article, ArticleCategory, Comment, ResearchPaper, CommunityPost } from './types/index.ts';
import {
  filterArticles,
  toggleBookmarkId,
  toggleArticleReaction,
  appendArticleComment,
} from './utils/pureLogic.ts';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [reels] = useState(STORY_REELS);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('সকল');
  const [activeNavTab, setActiveNavTab] = useState<string>('Home');
  
  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['art-brri-102-haor']);
  
  // Modals & Drawers
  const [activeReadingArticle, setActiveReadingArticle] = useState<Article | null>(null);
  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isFacebookCreatePostOpen, setIsFacebookCreatePostOpen] = useState(false);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);

  // Filtered Articles via pure logic function
  const filteredArticles = useMemo(() => {
    return filterArticles(articles, searchQuery, selectedCategory, 'trending');
  }, [articles, searchQuery, selectedCategory]);

  // Bookmarked articles list
  const savedArticles = useMemo(() => {
    return articles.filter((a) => bookmarkedIds.includes(a.id));
  }, [articles, bookmarkedIds]);

  // Handlers for Articles
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

  const handleCreateCommunityPost = (newPost: CommunityPost) => {
    setCommunityPosts((prev) => [newPost, ...prev]);
  };

  // Handlers for Community Posts
  const handleTogglePostLike = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const userLiked = !post.userLiked;
          return {
            ...post,
            userLiked,
            stats: {
              ...post.stats,
              likes: userLiked ? post.stats.likes + 1 : post.stats.likes - 1,
            },
          };
        }
        return post;
      })
    );
  };

  const handleTogglePostSave = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, userSaved: !post.userSaved } : post
      )
    );
  };

  const handleAddPostComment = (postId: string, newComment: Comment) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [newComment, ...post.comments],
            stats: {
              ...post.stats,
              commentsCount: post.stats.commentsCount + 1,
            },
          };
        }
        return post;
      })
    );
  };

  const handleOpenResearch = (paper: ResearchPaper) => {
    const match = articles.find((a) => a.id.includes(paper.institutionCode.toLowerCase())) || articles[0];
    setActiveReadingArticle(match);
  };

  const handleSelectTag = (tag: string) => {
    const cleanTag = tag.replace(/_/g, ' ');
    setSearchQuery(cleanTag);
    setSelectedCategory('সকল');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNavTab = (tab: string) => {
    setActiveNavTab(tab);
    if (tab === 'Reels') {
      setActiveReelId(reels[0]?.id || 'reel-1');
    } else if (tab === 'Explore') {
      setSelectedCategory('সকল');
      setSearchQuery('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'Events') {
      setSelectedCategory('স্টার্টআপ ও উদ্ভাবন');
    } else {
      setSelectedCategory('সকল');
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFAF5] text-[#04301F] selection:bg-[#04301F] selection:text-[#FDFAF4] font-sans">
      {/* 1. Header Bar (Small round search + Exactly Centered Navbar Tabs) */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        savedCount={savedArticles.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenNewPost={() => setIsFacebookCreatePostOpen(true)}
        activeNavTab={activeNavTab}
        onSelectNavTab={handleSelectNavTab}
        onScrollToReels={() => setActiveReelId(reels[0]?.id || 'reel-1')}
      />

      {/* 2. Main 3-Column Layout: Left Sidebar + Centered Newsfeed + Right Sidebar */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 flex-1 flex items-start justify-between gap-4 lg:gap-6">
        
        {/* Left Sidebar (Shortcuts, OpenAlex Topics, Research Network) */}
        <LeftSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          savedCount={savedArticles.length}
          onOpenSaved={() => setIsSavedDrawerOpen(true)}
          onScrollToReels={() => setActiveReelId(reels[0]?.id || 'reel-1')}
          onOpenEditorialPolicy={() => setActiveReadingArticle(articles[0])}
          onOpenAskAI={() => setIsAskAIOpen(true)}
        />

        {/* Central Content Feed - Width matches the centered navbar buttons */}
        <CentralFeed
          articles={filteredArticles}
          reels={reels}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenArticle={(art) => setActiveReadingArticle(art)}
          onOpenReel={(id) => setActiveReelId(id)}
          onOpenCreatePost={() => setIsFacebookCreatePostOpen(true)}
          onOpenWriteArticle={() => setIsCreatePostOpen(true)}
          onOpenUploadVideo={() => setActiveReelId(reels[0]?.id || 'reel-1')}
          onOpenAskAI={() => setIsAskAIOpen(true)}
          onOpenCreateStory={() => setIsFacebookCreatePostOpen(true)}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={handleToggleBookmark}
          onToggleLike={handleToggleLike}
          onAddComment={handleAddComment}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          communityPosts={communityPosts}
          onTogglePostLike={handleTogglePostLike}
          onTogglePostSave={handleTogglePostSave}
          onAddPostComment={handleAddPostComment}
          topicStories={TOPIC_STORIES}
        />

        {/* Right Sidebar (Desktop xl only: Trending 01-05, Events, Who to Follow) */}
        <RightSidebar
          researchPapers={RESEARCH_PAPERS}
          scientists={FEATURED_SCIENTISTS}
          marketData={MARKET_COMMODITIES}
          onOpenResearch={handleOpenResearch}
          onSelectTag={handleSelectTag}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />
      </div>

      {/* 3. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCreatePost={() => setIsFacebookCreatePostOpen(true)}
      />

      {/* 4. Modals & Drawers */}
      <FacebookCreatePostModal
        isOpen={isFacebookCreatePostOpen}
        onClose={() => setIsFacebookCreatePostOpen(false)}
        onSubmitPost={handleCreateCommunityPost}
      />

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

      <AskAIModal
        isOpen={isAskAIOpen}
        onClose={() => setIsAskAIOpen(false)}
      />
    </div>
  );
}
