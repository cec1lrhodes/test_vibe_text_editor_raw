interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

export const ToolbarButton = ({
  onClick,
  isActive,
  disabled,
  title,
  children,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      type="button"
      className={`
        h-8 w-8 flex items-center justify-center rounded-lg text-sm
        transition-all duration-150 active:scale-95
        disabled:opacity-40 disabled:cursor-not-allowed
        ${
          isActive
            ? "bg-zinc-100 text-zinc-900"
            : "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
        }
      `}
    >
      {children}
    </button>
  );
};
