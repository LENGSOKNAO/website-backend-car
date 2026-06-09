export type Role = {
    id: string;
    name: string;
    guard_name: string;
    pivot?: { model_id: string; role_id: string };
};

export type User = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    full_name: string;
    avatar_url: string | null;
    type: 'employee' | 'customer';
    has_ordered_from_me?: boolean;
    roles?: Role[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

/* @chisel-passkeys */
export type Passkey = {
    id: number;
    name: string;
    authenticator: string | null;
    created_at_diff: string;
    last_used_at_diff: string | null;
};
/* @end-chisel-passkeys */

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
