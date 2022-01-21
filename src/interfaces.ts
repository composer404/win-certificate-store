export interface WinCertificateParams {
    storeName?: string;
    storeLocation?: string;
    hasStoreName?: boolean;
    hasStoreLocation?: boolean;
}

export interface WinCertificate {
    pem: string;
    subject: string;
    thumbprint: string;
    issuer: string;
}