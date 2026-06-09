import { Head } from '@inertiajs/react';
import { Monitor, Moon, Sun } from 'lucide-react';
import Heading from '@/components/heading';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';

const themes = [
    {
        value: 'light' as const,
        icon: Sun,
        label: 'Light',
        description: 'Bright and clean interface',
        preview: 'bg-white text-gray-900',
        sidebar: 'bg-gray-100',
        card: 'bg-white border-gray-200',
        accent: 'bg-blue-500',
    },
    {
        value: 'dark' as const,
        icon: Moon,
        label: 'Dark',
        description: 'Easy on the eyes at night',
        preview: 'bg-gray-950 text-gray-100',
        sidebar: 'bg-gray-900',
        card: 'bg-gray-800 border-gray-700',
        accent: 'bg-blue-400',
    },
    {
        value: 'system' as const,
        icon: Monitor,
        label: 'System',
        description: 'Follows your device setting',
        preview: 'bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100',
        sidebar: 'bg-gray-100 dark:bg-gray-900',
        card: 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700',
        accent: 'bg-blue-500 dark:bg-blue-400',
    },
];

export default function Appearance() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <>
            <Head title="Appearance settings" />

            <h1 className="sr-only">Appearance settings</h1>

            <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                    <Heading
                        variant="small"
                        title="Appearance"
                        description="Choose how the app looks for you"
                    />

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        {themes.map(({ value, icon: Icon, label, description, preview, sidebar, card, accent }) => (
                            <button
                                key={value}
                                onClick={() => updateAppearance(value)}
                                className={cn(
                                    'group relative overflow-hidden rounded-xl border p-1 text-left transition-all',
                                    appearance === value
                                        ? 'border-blue-500 ring-1 ring-blue-500/50'
                                        : 'border-white/10 hover:border-white/20',
                                )}
                            >
                                <div className={cn('rounded-lg p-4 transition-colors', preview)}>
                                    <div className={cn('mb-3 flex items-center gap-2 rounded-md p-2', sidebar)}>
                                        <div className={cn('h-2 w-2 rounded-full', accent)} />
                                        <div className={cn('h-1.5 w-12 rounded', accent)} />
                                    </div>
                                    <div className={cn('space-y-2 rounded-md border p-3', card)}>
                                        <div className="flex items-center justify-between">
                                            <div className={cn('h-2 w-16 rounded', accent)} />
                                            <div className={cn('h-2 w-2 rounded-full', accent)} />
                                        </div>
                                        <div className="flex gap-2">
                                            <div className={cn('h-1.5 flex-1 rounded opacity-40', accent)} />
                                            <div className={cn('h-1.5 flex-1 rounded opacity-20', accent)} />
                                        </div>
                                        <div className={cn('h-1.5 w-3/4 rounded opacity-30', accent)} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 px-3 py-3">
                                    <div className={cn(
                                        'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                                        appearance === value
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white/5 text-gray-400 group-hover:text-gray-200',
                                    )}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className={cn(
                                            'text-sm font-medium',
                                            appearance === value ? 'text-white' : 'text-gray-300',
                                        )}>
                                            {label}
                                        </div>
                                        <div className="text-xs text-gray-500">{description}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        {
            title: 'Appearance settings',
            href: editAppearance(),
        },
    ],
};
