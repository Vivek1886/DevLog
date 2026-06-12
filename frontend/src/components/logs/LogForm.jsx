import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { MOOD_CONFIG } from "./MoodBadge";

const logSchema = z.object({
    title: z.string().min(3, "Min 3 chars").max(100, "Max 100 chars"),
    description: z.string().max(1000).optional().default(""),
    tags: z.string().optional(), // comma separated string — parsed below
    hoursSpent: z.coerce.number().min(0.5, "Min 0.5").max(16, "Max 16"),
    mood: z.enum(["focused", "motivated", "tired", "blocked", "okay"]),
    date: z.string().optional(),
});

const MOODS = ["focused", "motivated", "tired", "blocked", "okay"];

const LogForm = ({ onSubmit, defaultValues, isLoading }) => {
    const [tagInput, setTagInput] = useState(
        defaultValues?.tags?.join(", ") || ""
    );

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(logSchema),
        defaultValues: {
            title: defaultValues?.title || "",
            description: defaultValues?.description || "",
            hoursSpent: defaultValues?.hoursSpent || "",
            mood: defaultValues?.mood || "focused",
            date: defaultValues?.date
                ? new Date(defaultValues.date).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0],
        },
    });

    const selectedMood = watch("mood");

    const handleFormSubmit = (data) => {
        // Parse comma-separated tags into array
        const tags = tagInput
            .split(",")
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean)
            .slice(0, 5);
        onSubmit({ ...data, tags });
    };

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-5"
        >
            {/* Title */}
            <Input
                label="Title"
                placeholder="What did you build today?"
                error={errors.title?.message}
                {...register("title")}
            />

            {/* Description */}
            <Input
                label="Description"
                textarea
                rows={4}
                placeholder="Describe what you worked on, bugs fixed, things learned..."
                error={errors.description?.message}
                {...register("description")}
            />

            {/* Tags */}
            <div>
                <label className="block font-mono text-[0.7rem] text-muted
                                  uppercase tracking-widest mb-1.5">
                    Tags
                    <span className="normal-case ml-1 opacity-60">
                        (comma separated, max 5)
                    </span>
                </label>
                <input
                    type="text"
                    placeholder="nodejs, auth, mongodb"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="w-full bg-surface border border-border rounded
                               px-3.5 py-2.5 text-sm font-mono text-text outline-none
                               placeholder:text-muted focus:border-accent
                               focus:shadow-accent transition-all duration-150"
                />
                {/* Preview tags */}
                {tagInput && (
                    <div className="flex gap-1.5 flex-wrap mt-2">
                        {tagInput.split(",").map((t) => t.trim()).filter(Boolean)
                            .slice(0, 5).map((tag) => (
                                <span key={tag}
                                    className="font-mono text-[0.65rem] px-2 py-0.5
                                           bg-accent-dim text-accent rounded
                                           border border-accent/20">
                                    #{tag.toLowerCase()}
                                </span>
                            ))}
                    </div>
                )}
            </div>

            {/* Hours + Date row */}
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Hours Spent"
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="16"
                    placeholder="2.5"
                    error={errors.hoursSpent?.message}
                    {...register("hoursSpent")}
                />
                <Input
                    label="Date"
                    type="date"
                    error={errors.date?.message}
                    {...register("date")}
                />
            </div>

            {/* Mood picker */}
            <div>
                <label className="block font-mono text-[0.7rem] text-muted
                                  uppercase tracking-widest mb-2">
                    Mood
                </label>
                <div className="flex gap-2 flex-wrap">
                    {MOODS.map((mood) => {
                        const cfg = MOOD_CONFIG[mood];
                        const isActive = selectedMood === mood;
                        return (
                            <button
                                key={mood}
                                type="button"
                                onClick={() => setValue("mood", mood)}
                                className={`flex items-center gap-1.5 px-3 py-1.5
                                            rounded border font-mono text-xs
                                            transition-all duration-150 cursor-pointer
                                            ${isActive
                                        ? "scale-105"
                                        : "opacity-50 hover:opacity-80 bg-transparent"
                                    }`}
                                style={isActive ? {
                                    color: cfg.color,
                                    background: cfg.bg,
                                    borderColor: cfg.border,
                                } : {
                                    color: cfg.color,
                                    borderColor: cfg.border,
                                }}
                            >
                                {cfg.emoji} {mood}
                            </button>
                        );
                    })}
                </div>
                {errors.mood && (
                    <p className="text-danger text-xs font-mono mt-1">
                        {errors.mood.message}
                    </p>
                )}
            </div>

            {/* Submit */}
            <Button type="submit" loading={isLoading} fullWidth>
                Save Log
            </Button>
        </form>
    );
};

export default LogForm;