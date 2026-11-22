import { useId, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getIcon, iconNames } from "@/lib/cms/icons";
import { uploadImage } from "@/lib/cms/admin";
import { Headline as HeadlinePreview } from "@/components/Headline";
import type { Headline } from "@/lib/cms/types";

export const inputClass =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-foreground md:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  title,
  description,
  children,
  className,
}: {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-xl border border-border/70 bg-card p-6", className)}>
      {(title || description) && (
        <header className="mb-5">
          {title && <h2 className="font-heading text-base font-semibold text-foreground">{title}</h2>}
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </header>
      )}
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function TextField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: ReactNode;
  hint?: ReactNode;
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <input
        id={id}
        type={type}
        value={value ?? ""}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </Field>
  );
}

export function TextAreaField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: ReactNode;
  hint?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClass, "resize-y leading-relaxed")}
      />
    </Field>
  );
}

export function ToggleField({
  label,
  description,
  checked,
  onChange,
}: {
  label: ReactNode;
  description?: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4">
      <label htmlFor={id} className="cursor-pointer">
        <span className="block text-sm font-medium text-foreground">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>}
      </label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function moveItem<T>(items: T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function RowControls({
  index,
  count,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  onMove: (to: number) => void;
  onRemove: () => void;
}) {
  const btn =
    "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30";
  return (
    <div className="flex shrink-0 items-center">
      <button type="button" className={btn} disabled={index === 0} onClick={() => onMove(index - 1)} aria-label="Move up">
        <ArrowUp className="h-4 w-4" />
      </button>
      <button type="button" className={btn} disabled={index === count - 1} onClick={() => onMove(index + 1)} aria-label="Move down">
        <ArrowDown className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={cn(btn, "hover:bg-destructive/10 hover:text-destructive")}
        onClick={onRemove}
        aria-label="Remove"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-gold/50 hover:bg-gold/5 hover:text-gold"
    >
      <Plus className="h-4 w-4" />
      {children}
    </button>
  );
}

/** An ordered list of single-line strings (features, highlights, ...). */
export function StringListField({
  label,
  hint,
  items,
  onChange,
  placeholder,
  addLabel = "Add item",
}: {
  label: ReactNode;
  hint?: ReactNode;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const add = (at = items.length) => {
    onChange([...items.slice(0, at), "", ...items.slice(at)]);
    requestAnimationFrame(() => refs.current[at]?.focus());
  };

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={item}
              placeholder={placeholder}
              onChange={(e) => onChange(items.map((v, j) => (j === i ? e.target.value : v)))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  add(i + 1);
                }
              }}
              className={inputClass}
            />
            <RowControls
              index={i}
              count={items.length}
              onMove={(to) => onChange(moveItem(items, i, to))}
              onRemove={() => onChange(items.filter((_, j) => j !== i))}
            />
          </div>
        ))}
        <AddButton onClick={() => add()}>{addLabel}</AddButton>
      </div>
    </Field>
  );
}

/** Free-form tags: type and press Enter or comma. */
export function TagsField({
  label,
  hint,
  tags,
  onChange,
}: {
  label: ReactNode;
  hint?: ReactNode;
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [draft, setDraft] = useState("");
  const id = useId();

  const commit = () => {
    const value = draft.trim().replace(/,$/, "");
    if (value && !tags.includes(value)) onChange([...tags, value]);
    setDraft("");
  };

  return (
    <Field label={label} hint={hint ?? "Press Enter to add"} htmlFor={id}>
      <div className={cn(inputClass, "flex flex-wrap items-center gap-1.5 py-2")}>
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-gold/10 px-2 py-1 text-xs font-medium text-gold">
            {tag}
            <button type="button" onClick={() => onChange(tags.filter((t) => t !== tag))} aria-label={`Remove ${tag}`}>
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              commit();
            } else if (e.key === "Backspace" && !draft && tags.length) {
              onChange(tags.slice(0, -1));
            }
          }}
          onBlur={commit}
          className="min-w-[8rem] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          placeholder={tags.length ? "" : "e.g. React"}
        />
      </div>
    </Field>
  );
}

/** An ordered list of objects, each edited as a collapsible card. */
export function RepeaterField<T>({
  label,
  hint,
  items,
  onChange,
  newItem,
  itemTitle,
  renderItem,
  addLabel = "Add",
}: {
  label: ReactNode;
  hint?: ReactNode;
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  itemTitle: (item: T, index: number) => ReactNode;
  renderItem: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode;
  addLabel?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="overflow-hidden rounded-xl border border-border/70 bg-background">
              <div className="flex items-center gap-2 pl-4 pr-1">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-w-0 flex-1 items-center gap-2 py-3 text-left text-sm font-medium text-foreground"
                >
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", !isOpen && "-rotate-90")} />
                  <span className="truncate">{itemTitle(item, i) || <span className="text-muted-foreground">Untitled</span>}</span>
                </button>
                <RowControls
                  index={i}
                  count={items.length}
                  onMove={(to) => {
                    onChange(moveItem(items, i, to));
                    if (isOpen) setOpen(to);
                  }}
                  onRemove={() => {
                    onChange(items.filter((_, j) => j !== i));
                    setOpen(null);
                  }}
                />
              </div>
              {isOpen && (
                <div className="space-y-4 border-t border-border/60 bg-surface/50 p-4">
                  {renderItem(item, (patch) => onChange(items.map((v, j) => (j === i ? { ...v, ...patch } : v))), i)}
                </div>
              )}
            </div>
          );
        })}
        <AddButton
          onClick={() => {
            onChange([...items, newItem()]);
            setOpen(items.length);
          }}
        >
          {addLabel}
        </AddButton>
      </div>
    </Field>
  );
}

export function ImageField({
  label,
  hint,
  value,
  onChange,
  folder,
  aspect = "aspect-video",
}: {
  label: ReactNode;
  hint?: ReactNode;
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const upload = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    setUploading(true);
    try {
      onChange(await uploadImage(file, folder, file.name.replace(/\.[^.]+$/, "")));
    } catch (e) {
      toast.error("Upload failed", { description: e instanceof Error ? e.message : undefined });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Field label={label} hint={hint}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          upload(e.dataTransfer.files[0]);
        }}
        className={cn(
          "group relative overflow-hidden rounded-xl border bg-muted/40 transition-colors",
          aspect,
          dragging ? "border-gold bg-gold/5" : "border-border border-dashed",
        )}
      >
        {value ? (
          <>
            <img src={value} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black"
              >
                <Upload className="h-3.5 w-3.5" /> Replace
              </button>
              <button
                type="button"
                onClick={() => onChange(null)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-muted-foreground transition-colors hover:text-gold"
          >
            <ImagePlus className="h-7 w-7" />
            <span className="text-sm font-medium">Click or drop an image</span>
            <span className="text-xs">Large photos are resized automatically</span>
          </button>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Loader2 className="h-6 w-6 animate-spin text-gold" />
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            upload(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
    </Field>
  );
}

export function IconField({
  label = "Icon",
  value,
  onChange,
}: {
  label?: ReactNode;
  value: string;
  onChange: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const Current = getIcon(value);

  return (
    <Field label={label}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button type="button" className={cn(inputClass, "flex items-center gap-3 text-left")}>
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gold/10">
              <Current className="h-4 w-4 text-gold" />
            </span>
            <span className="flex-1">{value}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-2" align="start">
          <div className="grid grid-cols-6 gap-1">
            {iconNames.map((name) => {
              const Icon = getIcon(name);
              return (
                <button
                  key={name}
                  type="button"
                  title={name}
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gold/10 hover:text-gold",
                    name === value ? "bg-gold/15 text-gold" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  );
}

/** Edits a section heading and previews it the way the site renders it. */
export function HeadlineFields<T extends Headline>({
  value,
  onChange,
}: {
  value: T;
  onChange: (value: T) => void;
}) {
  const set = (patch: Partial<Headline>) => onChange({ ...value, ...patch });
  return (
    <div className="space-y-4">
      <TextField label="Eyebrow" hint="Small label above the heading" value={value.eyebrow} onChange={(eyebrow) => set({ eyebrow })} />
      <div className="grid gap-4 sm:grid-cols-3">
        <TextField label="Heading" value={value.before} onChange={(before) => set({ before })} />
        <TextField label="Gold highlight" value={value.highlight} onChange={(highlight) => set({ highlight })} />
        <TextField label="After (optional)" value={value.after} onChange={(after) => set({ after })} />
      </div>
      <HeadingPreview eyebrow={value.eyebrow} before={value.before} highlight={value.highlight} after={value.after} />
    </div>
  );
}

export function HeadingPreview({ eyebrow, before, highlight, after }: Partial<Headline> & { before: string; highlight: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background px-5 py-4">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Preview</p>
      {eyebrow && <p className="mb-1 text-xs font-semibold text-gold">{eyebrow}</p>}
      <p className="font-heading text-2xl font-bold text-foreground">
        <HeadlinePreview before={before} highlight={highlight} after={after} />
      </p>
    </div>
  );
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Light cleanup while typing a slug (keeps trailing hyphens so typing isn't fought). */
export function cleanSlugInput(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
