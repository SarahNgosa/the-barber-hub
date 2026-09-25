// The look of a selectable option card: black when selected, outlined when not
export const optionClass = (selected) =>
  `grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-x-4 border-2 p-4 text-left transition-colors ${
    selected ? 'border-ink bg-ink text-paper' : 'border-black/15 bg-paper hover:border-ink'
  }`