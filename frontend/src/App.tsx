import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { TopicDetailPage } from './pages/TopicDetailPage';
import { SolvedExamplesPage } from './pages/SolvedExamplesPage';
import { QuestionBankPage } from './pages/QuestionBankPage';
import { VisualizerLabPage } from './pages/VisualizerLabPage';
import { CalculatorLabPage } from './pages/CalculatorLabPage';
import { QuizPage } from './pages/QuizPage';
import { FormulaSheetPage } from './pages/FormulaSheetPage';
import { ProgressPage } from './pages/ProgressPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { SettingsPage } from './pages/SettingsPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { SYLLABUS_MODULES } from './data/syllabus';
import { LanguageMode, ThemeMode } from './types';
import { 
  fetchUserProgress, 
  saveTopicCompletion, 
  saveQuestionAttempt, 
  saveQuizScore, 
  toggleBookmark,
  checkBackendHealth 
} from './services/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('module-1');
  const [language, setLanguage] = useState<LanguageMode>('both');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  // Persistent Progress
  const [completedTopics, setCompletedTopics] = useState<string[]>(['module-1']);
  const [questionAttempts, setQuestionAttempts] = useState<Record<string, any>>({});
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [quizScores, setQuizScores] = useState<any[]>([]);

  // Check backend health & load initial progress
  useEffect(() => {
    const init = async () => {
      const isOnline = await checkBackendHealth();
      setIsBackendConnected(isOnline);

      const prog = await fetchUserProgress();
      if (prog) {
        if (prog.completed_topics?.length > 0) {
          setCompletedTopics(prog.completed_topics);
        }
        if (prog.question_attempts) {
          setQuestionAttempts(prog.question_attempts);
        }
        if (prog.bookmarked_items) {
          setBookmarks(prog.bookmarked_items);
        }
        if (prog.quiz_scores) {
          setQuizScores(prog.quiz_scores);
        }
        if (prog.settings?.language) {
          setLanguage(prog.settings.language);
        }
      }
    };
    init();

    // Recheck backend status every 15s
    const timer = setInterval(async () => {
      const isOnline = await checkBackendHealth();
      setIsBackendConnected(isOnline);
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  const handleToggleComplete = async (moduleId: string) => {
    let updated: string[];
    if (completedTopics.includes(moduleId)) {
      updated = completedTopics.filter(id => id !== moduleId);
    } else {
      updated = [...completedTopics, moduleId];
      await saveTopicCompletion(moduleId);
    }
    setCompletedTopics(updated);
    localStorage.setItem('completed_topics', JSON.stringify(updated));
  };

  const handleLogQuestionAttempt = async (questionId: string, isCorrect: boolean, hintsUsed: number) => {
    const copy = { ...questionAttempts };
    copy[questionId] = {
      isCorrect,
      hintsUsed,
      attempts: (copy[questionId]?.attempts || 0) + 1
    };
    setQuestionAttempts(copy);
    await saveQuestionAttempt(questionId, isCorrect, hintsUsed);
  };

  const handleSaveQuizScore = async (quizId: string, topicId: string, score: number, total: number) => {
    const entry = {
      quizId,
      topicId,
      score,
      total,
      percentage: Math.round((score / total) * 100),
      date: new Date().toISOString()
    };
    const updated = [...quizScores, entry];
    setQuizScores(updated);
    await saveQuizScore(quizId, topicId, score, total);
  };

  const handleToggleBookmark = async (item: any) => {
    const exists = bookmarks.some(b => b.id === item.id);
    let updated: any[];
    if (exists) {
      updated = bookmarks.filter(b => b.id !== item.id);
      await toggleBookmark(item, true);
    } else {
      updated = [...bookmarks, item];
      await toggleBookmark(item, false);
    }
    setBookmarks(updated);
  };

  const handleResetProgress = () => {
    setCompletedTopics([]);
    setQuestionAttempts({});
    setBookmarks([]);
    setQuizScores([]);
    localStorage.clear();
  };

  const currentModule = SYLLABUS_MODULES.find(m => m.id === selectedModuleId) || SYLLABUS_MODULES[0];

  const avgQuizScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((acc, q) => acc + q.percentage, 0) / quizScores.length)
    : 85;

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${theme}`}>
      {/* Top Navbar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isBackendConnected={isBackendConnected}
        completedTopicsCount={completedTopics.length}
        totalTopicsCount={SYLLABUS_MODULES.length}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedModuleId={selectedModuleId}
          onSelectModule={setSelectedModuleId}
          completedTopics={completedTopics}
        />

        {/* Main Workspace Area */}
        <main className="flex-1 p-4 md:p-6 max-w-5xl overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardPage
              onNavigate={(tab, modId) => {
                if (modId) setSelectedModuleId(modId);
                setActiveTab(tab);
              }}
              completedTopics={completedTopics}
              questionAttemptsCount={Object.keys(questionAttempts).length}
              avgQuizScore={avgQuizScore}
              language={language}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapPage
              completedTopics={completedTopics}
              onSelectModule={setSelectedModuleId}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'topic' && (
            <TopicDetailPage
              module={currentModule}
              language={language}
              isCompleted={completedTopics.includes(currentModule.id)}
              onToggleComplete={handleToggleComplete}
              onNavigate={(tab, modId) => {
                if (modId) setSelectedModuleId(modId);
                setActiveTab(tab);
              }}
              isBookmarked={bookmarks.some(b => b.id === currentModule.id)}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'examples' && (
            <SolvedExamplesPage
              initialModuleId={selectedModuleId}
              language={language}
            />
          )}

          {activeTab === 'questions' && (
            <QuestionBankPage
              initialModuleId={selectedModuleId}
              language={language}
              bookmarkedIds={bookmarks.map(b => b.id)}
              onToggleBookmark={handleToggleBookmark}
              onLogAttempt={handleLogQuestionAttempt}
            />
          )}

          {activeTab === 'visualizer' && (
            <VisualizerLabPage language={language} />
          )}

          {activeTab === 'calculator' && (
            <CalculatorLabPage language={language} />
          )}

          {activeTab === 'quiz' && (
            <QuizPage
              language={language}
              onSaveQuizScore={handleSaveQuizScore}
            />
          )}

          {activeTab === 'formulas' && (
            <FormulaSheetPage language={language} />
          )}

          {activeTab === 'progress' && (
            <ProgressPage
              completedTopics={completedTopics}
              questionAttempts={questionAttempts}
              quizScores={quizScores}
              onNavigate={(tab, modId) => {
                if (modId) setSelectedModuleId(modId);
                setActiveTab(tab);
              }}
            />
          )}

          {activeTab === 'bookmarks' && (
            <BookmarksPage
              bookmarks={bookmarks}
              onRemoveBookmark={(id) => handleToggleBookmark({ id })}
              onNavigate={(tab, modId) => {
                if (modId) setSelectedModuleId(modId);
                setActiveTab(tab);
              }}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage
              language={language}
              onLanguageChange={setLanguage}
              theme={theme}
              onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              isBackendConnected={isBackendConnected}
              onResetProgress={handleResetProgress}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
