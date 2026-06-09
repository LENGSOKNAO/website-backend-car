import { Head, router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { useRef, useState } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
};

export default function Profile(
    {
        mustVerifyEmail,
        status,
    }: {
        mustVerifyEmail: boolean;
        status?: string;
    },
) {
    const { auth } = usePage<PageProps>().props;
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const compressImage = (file: File, maxW = 1200, quality = 0.8): Promise<File> =>
        new Promise((resolve, reject) => {
            const img = new Image();
            const url = URL.createObjectURL(file);
            img.onload = () => {
                URL.revokeObjectURL(url);
                const scale = Math.min(maxW / img.width, maxW / img.height, 1);
                const w = Math.round(img.width * scale);
                const h = Math.round(img.height * scale);
                const canvas = document.createElement('canvas');
                canvas.width = w; canvas.height = h;
                canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
                canvas.toBlob(
                    (blob) => {
                        if (!blob) { reject(new Error('Compression failed')); return }
                        resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }));
                    },
                    'image/jpeg',
                    quality,
                );
            };
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = url;
        });

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const processed = file.type === 'image/svg+xml' ? file : await compressImage(file);
            setAvatarFile(processed);
            const reader = new FileReader();
            reader.onload = () => setAvatarPreview(reader.result as string);
            reader.readAsDataURL(processed);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const form = e.currentTarget;
        const formData = new FormData(form);
        if (avatarFile) {
            formData.set('avatar', avatarFile);
        }
        formData.append('_method', 'PATCH');

        const url = ProfileController.update.form().action;

        router.post(url, formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setAvatarFile(null);
                setAvatarPreview(null);
                setProcessing(false);
            },
            onError: (err) => {
                setErrors(err);
                setProcessing(false);
            },
        });
    };

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                    <Heading
                        variant="small"
                        title="Profile information"
                        description="Update your name, email address, and profile picture"
                    />

                    <div className="mt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <Avatar className="size-20 border-2 border-white/10">
                                        <AvatarImage src={avatarPreview ?? auth.user.avatar_url ?? undefined} />
                                        <AvatarFallback className="text-xl bg-white/5 text-gray-400">
                                            {auth.user.name?.charAt(0)?.toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <Camera className="size-5 text-white" />
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="avatar"
                                        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                                        className="hidden"
                                        onChange={handleFileSelect}
                                    />
                                </div>
                                <div className="text-sm text-gray-400">
                                    <p className="font-medium text-gray-300">{auth.user.name}</p>
                                    <p>{auth.user.email}</p>
                                    <p className="mt-1 text-xs">Click the camera icon to change your profile picture</p>
                                </div>
                            </div>

                            <InputError
                                className="mt-2"
                                message={errors.avatar}
                            />

                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-gray-300">Name</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                                    defaultValue={auth.user.name}
                                    name="full_name"
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.full_name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-gray-300">Email address</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                                    defaultValue={auth.user.email}
                                    name="email"
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            {mustVerifyEmail &&
                                auth.user.email_verified_at === null && (
                                    <div>
                                        <p className="-mt-4 text-sm text-gray-400">
                                            Your email address is unverified.{' '}
                                            <Link
                                                href={send()}
                                                as="button"
                                                className="text-blue-400 underline decoration-blue-400/30 underline-offset-4 transition-colors duration-300 ease-out hover:text-blue-300 hover:decoration-blue-300"
                                            >
                                                Click here to resend the
                                                verification email.
                                            </Link>
                                        </p>

                                        {status ===
                                            'verification-link-sent' && (
                                            <div className="mt-2 text-sm font-medium text-green-400">
                                                A new verification link has been
                                                sent to your email address.
                                            </div>
                                        )}
                                    </div>
                                )}

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-cyan-500 hover:shadow-blue-500/30"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <DeleteUser />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};