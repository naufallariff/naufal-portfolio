type Props = {
    tag: string;
    title: string;
    align?: "center" | "left";
};

export function SectionHeader({ tag, title, align = "center" }: Props) {
    const center = align === "center";

    return (
        <header
            className={`mb-12 flex flex-col gap-4 ${center ? "items-center text-center" : "items-start text-left"}`}
        >
            <span className="apple-glass inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-apple-electric">
                {tag}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
                {title}
            </h2>
        </header>
    );
}