import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | null>(null);

    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label className="text-gray-300">I am looking to</Label>
                                <div className="flex rounded-lg border border-white/10 bg-white/5 p-1">
                                    {(['buyer', 'seller'] as const).map((role) => (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => setSelectedRole(role)}
                                            className={cn(
                                                'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all',
                                                selectedRole === role
                                                    ? 'bg-blue-500 text-white shadow-sm'
                                                    : 'text-gray-400 hover:text-gray-200',
                                            )}
                                        >
                                            {role === 'buyer' ? 'Browse' : 'Sell'}
                                        </button>
                                    ))}
                                </div>
                                <input type="hidden" name="role" value={selectedRole ?? ''} />
                                <InputError message={errors.role} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="full_name" className="text-gray-300">Name</Label>
                                <Input
                                    id="full_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="full_name"
                                    placeholder="Full name"
                                    className="border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                                />
                                <InputError
                                    message={errors.full_name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-gray-300">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className="border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-gray-300">Password</Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                    passwordrules={passwordRules}
                                    className="border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-gray-300">
                                    Confirm password
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    passwordrules={passwordRules}
                                    className="border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-cyan-500 hover:shadow-blue-500/30"
                                tabIndex={5}
                                data-test="register-user-button"
                                disabled={processing}
                            >
                                {processing && <Spinner className="text-white" />}
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-gray-400">
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={6} className="text-blue-400 hover:text-blue-300">
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
