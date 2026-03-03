interface CardActionsProps {
  onDelete: () => void;
  onEdit: () => void;
}

export const CardActions = ({ onDelete, onEdit }: CardActionsProps) => {
  return (
    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800/80 text-zinc-400 backdrop-blur-sm hover:bg-blue-500 hover:text-white transition-all duration-200"
        title="Edit"
      >
        ✎
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800/80 text-zinc-400 backdrop-blur-sm hover:bg-red-500 hover:text-white transition-all duration-200"
        title="Delete"
      >
        ✕
      </button>
    </div>
  );
};
