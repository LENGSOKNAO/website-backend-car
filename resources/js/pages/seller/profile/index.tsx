import { Head, router } from '@inertiajs/react';
import { User, ShieldCheck, Upload, Building2, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import seller from '@/routes/seller';

interface SellerVerification {
    id: string;
    id_type: string;
    id_number: string;
    id_image_url: string | null;
    business_license_url: string | null;
    verification_status: string;
    submitted_at: string | null;
    verified_at: string | null;
}

export default function SellerProfile({ user, verification }: { user: any; verification: SellerVerification | null }) {
    const [dealerName, setDealerName] = useState(user.dealer_name ?? '');
    const [location, setLocation] = useState(user.location ?? '');
    const [phone, setPhone] = useState(user.phone ?? '');
    const [isSaving, setIsSaving] = useState(false);

    const [idType, setIdType] = useState(verification?.id_type ?? '');
    const [idNumber, setIdNumber] = useState(verification?.id_number ?? '');
    const [isSubmittingVerification, setIsSubmittingVerification] = useState(false);

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        router.put(seller.profile.update().url, { dealer_name: dealerName, location, phone }, {
            preserveState: true,
            onFinish: () => setIsSaving(false),
        });
    };

    const handleVerificationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingVerification(true);
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        router.post(seller.profile.verification().url, formData, {
            preserveState: true,
            headers: { 'Content-Type': 'multipart/form-data' },
            onFinish: () => setIsSubmittingVerification(false),
        });
    };

    const verificationBadge = (status: string | undefined) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            pending: 'secondary',
            verified: 'default',
            rejected: 'destructive',
        };

        return (
            <Badge variant={status && variants[status] ? variants[status] : 'outline'} className="capitalize">
                {status ?? 'not submitted'}
            </Badge>
        );
    };

    return (
        <>
            <Head title="Seller Profile" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Seller Profile</h1>
                        <p className="text-sm text-muted-foreground">Manage your business information and verification</p>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Building2 className="size-4" /> Business Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleProfileUpdate} className="space-y-4">
                                <div className="flex items-center gap-4 mb-4">
                                    <Avatar className="size-16">
                                        <AvatarImage src={user.avatar_url ?? undefined} />
                                        <AvatarFallback className="text-lg">{user.full_name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{user.full_name}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dealer_name">Dealer / Business Name</Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                                        <Input
                                            id="dealer_name"
                                            className="pl-8"
                                            value={dealerName}
                                            onChange={(e) => setDealerName(e.target.value)}
                                            placeholder="Your dealership or business name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                                        <Input
                                            id="location"
                                            className="pl-8"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="City, State"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            className="pl-8"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>

                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <ShieldCheck className="size-4" /> Verification
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <div>
                                    <p className="text-sm font-medium">Verification Status</p>
                                    <p className="text-xs text-muted-foreground">Verify your identity to build buyer trust</p>
                                </div>
                                <div>{verificationBadge(verification?.verification_status)}</div>
                            </div>

                            {verification?.verification_status === 'verified' ? (
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center">
                                    <ShieldCheck className="mx-auto mb-2 size-8 text-emerald-600" />
                                    <p className="font-medium text-emerald-800">You are verified!</p>
                                    <p className="text-xs text-emerald-600">Verified on {verification.verified_at ? new Date(verification.verified_at).toLocaleDateString() : 'N/A'}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleVerificationSubmit} className="space-y-4" encType="multipart/form-data">
                                    <div className="space-y-2">
                                        <Label htmlFor="id_type">ID Type</Label>
                                        <Select value={idType} onValueChange={setIdType} name="id_type">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select ID type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="passport">Passport</SelectItem>
                                                <SelectItem value="drivers_license">Driver's License</SelectItem>
                                                <SelectItem value="national_id">National ID</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="id_number">ID Number</Label>
                                        <Input
                                            id="id_number"
                                            name="id_number"
                                            value={idNumber}
                                            onChange={(e) => setIdNumber(e.target.value)}
                                            placeholder="Enter your ID number"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="id_image">Upload ID Image</Label>
                                        <Input id="id_image" name="id_image" type="file" accept="image/*" className="cursor-pointer" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="business_license">Business License (optional)</Label>
                                        <Input id="business_license" name="business_license" type="file" accept="image/*" className="cursor-pointer" />
                                    </div>

                                    <Button type="submit" disabled={isSubmittingVerification || !idType || !idNumber}>
                                        <Upload className="size-4" />
                                        {isSubmittingVerification ? 'Submitting...' : 'Submit for Verification'}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

SellerProfile.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Profile', href: seller.profile.index() },
    ],
};
