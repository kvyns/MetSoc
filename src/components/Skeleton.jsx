import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ className = '' }) => (
  <motion.div
    className={`bg-slate-800/50 rounded animate-pulse ${className}`}
    initial={{ opacity: 0.5 }}
    animate={{ opacity: [0.5, 0.8, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  />
);

export const EventCardSkeleton = () => (
  <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
    <Skeleton className="h-48 w-full mb-4" />
    <Skeleton className="h-6 w-3/4 mb-3" />
    <Skeleton className="h-4 w-1/2 mb-4" />
    <Skeleton className="h-20 w-full" />
  </div>
);

export const UpdateCardSkeleton = () => (
  <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
    <div className="flex items-start gap-4">
      <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
      <div className="flex-1">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/3 mb-3" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  </div>
);

export const GalleryImageSkeleton = () => (
  <Skeleton className="aspect-square rounded-lg" />
);

export const ListSkeleton = ({ count = 3, CardComponent = EventCardSkeleton }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <CardComponent key={i} />
    ))}
  </div>
);

export default Skeleton;
