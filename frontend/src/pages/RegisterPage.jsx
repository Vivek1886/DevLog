import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import useAuthStore from "../store/authStore";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Min 3 characters")
        .max(20, "Max 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Letters, numbers, underscores only"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Min 6 characters"),
    avatar: z.string().optional(),
});

const AVATARS = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6"];

// Simple colored circles as avatar placeholders
const AVATAR_COLORS = {
    avatar1: "#39ff85",
    avatar2: "#60a5fa",
    avatar3: "#a78bfa",
    avatar4: "#ffb347",
    avatar5: "#ff4d4d",
    avatar6: "#f472b6",
};

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register: registerUser, isLoading } = useAuthStore();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: { avatar: "avatar1" },
    });

    const selectedAvatar = watch("avatar");

    const onSubmit = async (data) => {
        const success = await registerUser(data);
        if (success) navigate("/login");
    };

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-sm"
            >
                {/* Logo */}
                <div className="flex items-center gap-2 font-display text-xl
                                font-extrabold text-accent tracking-tight mb-8">
                    <span className="bg-accent text-bg w-6 h-6 rounded text-xs
                                     font-black flex items-center justify-center">
                        D
                    </span>
                    DevLog
                </div>

                {/* Card */}
                <div className="bg-surface border border-border rounded-lg p-7">
                    <h2 className="font-display font-bold text-2xl text-text mb-1">
                        Create account
                    </h2>
                    <p className="text-muted text-sm mb-6">
                        Start tracking your dev activity today.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        {/* Avatar picker */}
                        <div>
                            <p className="font-mono text-[0.7rem] text-muted uppercase
                                          tracking-widest mb-2">
                                Pick an avatar
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {AVATARS.map((av) => (
                                    <button
                                        key={av}
                                        type="button"
                                        onClick={() => setValue("avatar", av)}
                                        className={`w-9 h-9 rounded-full border-2 transition-all
                                                    duration-150 cursor-pointer font-display
                                                    font-bold text-sm text-bg
                                                    ${selectedAvatar === av
                                                ? "border-accent scale-110"
                                                : "border-transparent opacity-60 hover:opacity-100"
                                            }`}
                                        style={{ background: AVATAR_COLORS[av] }}
                                    >
                                        {av.replace("avatar", "")}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Input
                            label="Username"
                            placeholder="vivek_dev"
                            error={errors.username?.message}
                            hint="Letters, numbers, underscores only"
                            {...register("username")}
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            error={errors.email?.message}
                            {...register("email")}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            hint="Minimum 6 characters"
                            {...register("password")}
                        />

                        <Button
                            type="submit"
                            loading={isLoading}
                            fullWidth
                            className="mt-2"
                        >
                            Create Account
                        </Button>
                    </form>
                </div>

                <p className="text-center text-muted text-sm mt-5">
                    Already have an account?{" "}
                    <Link to="/login" className="text-accent hover:opacity-80">
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default RegisterPage;