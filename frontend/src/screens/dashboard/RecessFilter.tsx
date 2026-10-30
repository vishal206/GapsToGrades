type RecessFilterProps = {
  id: string;
};

// The recess hover for tiles a CSS inset box-shadow can't follow (FolderShape's tab, NoteShape's folded
// corner). Apply it with `filter: url(#id)` on an element that also has `group`; it traces the whole
// outline: invert the shape's alpha, blur and nudge it down, then keep only the part inside the shape.
// The filter is always applied; hover only animates the shade's flood-opacity, so it fades rather than
// snapping on. Each tile needs its own id: the flood reacts to the hover of the group it sits in.
export function RecessFilter({ id }: RecessFilterProps) {
  return (
    <svg aria-hidden="true" className="absolute size-0 text-ink">
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
        <feComponentTransfer in="SourceAlpha" result="outside">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feGaussianBlur in="outside" stdDeviation="2" />
        <feOffset dy="2" result="shade" />
        <feFlood
          floodColor="currentColor"
          className="[flood-opacity:0] transition-[flood-opacity] duration-200 group-hover:[flood-opacity:0.1] group-has-focus-visible:[flood-opacity:0.1]"
        />
        <feComposite in2="shade" operator="in" />
        <feComposite in2="SourceAlpha" operator="in" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode />
        </feMerge>
      </filter>
    </svg>
  );
}
