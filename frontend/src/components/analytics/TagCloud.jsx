const TagCloud = ({ data = [] }) => {
    if (!data.length) return (
        <p className="text-muted font-mono text-xs text-center py-4">
            No tags yet
        </p>
    );

    const max = data[0]?.count || 1;

    return (
        <div className="flex flex-wrap gap-2">
            {data.map((t) => {
                const ratio = t.count / max;
                const size = 0.7 + ratio * 0.5; // 0.7rem → 1.2rem
                const opacity = 0.4 + ratio * 0.6;

                return (
                    <span
                        key={t.tag}
                        className="font-mono px-2.5 py-1 rounded border
                                   bg-accent-dim border-accent/20 text-accent
                                   transition-all duration-150 hover:opacity-100
                                   hover:scale-105 cursor-default"
                        style={{ fontSize: `${size}rem`, opacity }}
                        title={`${t.count} log(s)`}
                    >
                        #{t.tag}
                        <span className="ml-1 text-[0.6rem] opacity-60">
                            {t.count}
                        </span>
                    </span>
                );
            })}
        </div>
    );
};

export default TagCloud;