interface CardActionsProps {
  onDelete: () => void;
  onEdit?: () => void;
  onPublish?: () => void;
  isPublished?: boolean;
}

export const CardActions = ({
  onDelete,
  onEdit,
  isPublished,
  onPublish,
}: CardActionsProps) => {
  return (
    <div className="absolute top-2 right-2 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-10">
      {/* Publish */}
      {onPublish && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPublish();
          }}
          className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg backdrop-blur-sm transition-all duration-200
          ${
            isPublished
              ? "bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400"
              : "bg-zinc-800/80 text-zinc-400 hover:bg-green-500 hover:text-white"
          }`}
          title={isPublished ? "Unpublish" : "Publish"}
        >
          {isPublished ? "✓" : "↗"}
        </button>
      )}

      {/* Edit */}
      {onEdit && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-zinc-800/80 text-zinc-400 backdrop-blur-sm hover:bg-blue-500 hover:text-white transition-all duration-200"
          title="Edit"
        >
          ✎
        </button>
      )}

      {/* Delete */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-zinc-800/80 text-zinc-400 backdrop-blur-sm hover:bg-red-500 hover:text-white transition-all duration-200"
        title="Delete"
      >
        ✕
      </button>
    </div>
  );
};
