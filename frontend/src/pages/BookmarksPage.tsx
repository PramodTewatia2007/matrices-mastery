import React from 'react';
import { Bookmark, Trash2, ArrowRight, BookOpen, HelpCircle } from 'lucide-react';
import { ActiveTab } from '../components/Sidebar';

interface BookmarksPageProps {
  bookmarks: { id: string; type: 'topic' | 'example' | 'question'; title: string; moduleId: string }[];
  onRemoveBookmark: (id: string) => void;
  onNavigate: (tab: ActiveTab, moduleId?: string) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  bookmarks,
  onRemoveBookmark,
  onNavigate
}) => {
  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
          <Bookmark className="w-3.5 h-3.5" />
          Revision & Saved Notes
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
          Bookmarked Concepts & Problems
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Quickly review difficult definitions, challenging practice questions, and important solved examples saved during your study sessions.
        </p>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {bookmarks.length > 0 ? (
          bookmarks.map((b) => (
            <div 
              key={b.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex items-center justify-between gap-4 transition hover:border-slate-700"
            >
              <div className="flex items-center gap-3 truncate">
                <div className={`p-2 rounded-lg shrink-0 ${
                  b.type === 'topic' ? 'bg-indigo-600/20 text-indigo-400' : 'bg-emerald-600/20 text-emerald-400'
                }`}>
                  {b.type === 'topic' ? <BookOpen className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {b.type}
                  </span>
                  <span className="text-xs font-semibold text-slate-100 truncate block">
                    {b.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onNavigate(b.type === 'topic' ? 'topic' : 'questions', b.moduleId)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-medium flex items-center gap-1 transition"
                >
                  Open <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onRemoveBookmark(b.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 transition"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            No bookmarks saved yet. Click the bookmark icon on any topic or question to save it for quick revision.
          </div>
        )}
      </div>

    </div>
  );
};

export default BookmarksPage;
