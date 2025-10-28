import RegisterForm from "@/app/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md">
                <div className="bg-light-primary/60 dark:bg-dark-primary/60 rounded-lg p-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Register
                    </h1>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}