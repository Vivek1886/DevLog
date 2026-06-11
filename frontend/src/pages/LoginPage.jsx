import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import useAuthStore from "../store/authStore";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, isLoading } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });

    const onSubmit = async (data) => {
        const success = await login(data);
        if (success) navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-4">
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
                        Welcome back
                    </h2>
                    <p className="text-muted text-sm mb-6">
                        Log in to continue tracking your grind.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                            {...register("password")}
                        />

                        <Button
                            type="submit"
                            loading={isLoading}
                            fullWidth
                            className="mt-2"
                        >
                            Login
                        </Button>
                    </form>
                </div>

                <p className="text-center text-muted text-sm mt-5">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-accent hover:opacity-80">
                        Register
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;