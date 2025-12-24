import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export const AbilityNotification: React.FC = () => {
  const abilityNotifications = useGameStore(state => state.abilityNotifications);
  const abilityNotification = useGameStore(state => state.abilityNotification);
  const clearNotification = () => useGameStore.setState({ abilityNotification: null });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Legacy notification (top center)
  useEffect(() => {
    if (abilityNotification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [abilityNotification]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [abilityNotifications]);

  // Notifications persist indefinitely (removed auto-dismiss)

  return (
    <>
      {/* Legacy notification (top center) */}
      <AnimatePresence>
        {abilityNotification && (
          <motion.div
            key={abilityNotification.timestamp}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
          >
            <div className="bg-gradient-to-r from-cyan-900/95 to-blue-900/95 border-2 border-cyan-400 rounded-lg px-6 py-3 shadow-2xl backdrop-blur-sm">
              <div className="text-sm font-bold text-cyan-200 text-center whitespace-nowrap">
                {abilityNotification.text}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Log (bottom-left, scrollable) */}
      <div className="fixed bottom-4 left-4 z-[100] max-w-md w-96 max-h-[400px] bg-slate-900/90 border-2 border-slate-600 rounded-lg shadow-2xl backdrop-blur-sm overflow-hidden pointer-events-auto">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-600 px-3 py-1.5">
          <div className="text-xs font-bold text-slate-300">Game Log</div>
        </div>

        {/* Scrollable message area */}
        <div ref={scrollContainerRef} className="overflow-y-auto max-h-[360px] p-2 space-y-1">
          {abilityNotifications.length === 0 ? (
            <div className="text-xs text-slate-500 italic text-center py-4">No messages yet</div>
          ) : (
            abilityNotifications.map((notification) => (
              <div
                key={notification.id}
                className="text-xs text-slate-200 bg-slate-800/50 rounded px-2 py-1 border border-slate-700"
              >
                <span className="text-purple-300 font-semibold">{notification.unitName}:</span> {notification.text}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
