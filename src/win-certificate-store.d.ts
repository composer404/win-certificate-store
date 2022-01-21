import { WinCertificate, WinCertificateParams } from './interfaces';
export declare class WinCertificateStore {
    private params;
    private nativeCertFunction;
    constructor(params: WinCertificateParams);
    getAllCertificates(): WinCertificate[];
    getCertificateByIssuer(issuer: string): Promise<WinCertificate>;
    getCertificateBySubject(subject: string): Promise<WinCertificate>;
    private prepareParams;
}
