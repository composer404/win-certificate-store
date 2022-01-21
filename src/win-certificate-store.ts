import * as edge from 'edge-js';
import * as path from 'path';
import { WinCertificate, WinCertificateParams } from './interfaces';

export class WinCertificateStore {
    private params: WinCertificateParams ;
    private nativeCertFunction = edge.func(path.join(__dirname, '../resource/get_certs.csx'));

    constructor(params: WinCertificateParams) {
       this.params = this.prepareParams(params);
    }

    getAllCertificates(): WinCertificate[] {
        return (this.nativeCertFunction(this.params, true) as any);
    }

    async getCertificateByIssuer(issuer: string): Promise<WinCertificate> {
        const certificates = this.getAllCertificates();

        const promise = new Promise<WinCertificate>((resolve, reject) => {
            for(let cert of certificates) {
                if (cert.issuer.includes(issuer)) {
                    resolve(cert);
                }
            }
        })

        const result = await promise;
        return result;
    }

    async getCertificateBySubject(subject: string): Promise<WinCertificate> {
        const certificates = this.getAllCertificates();

        const promise = new Promise<WinCertificate>((resolve, reject) => {
            for(let cert of certificates) {
                const name = cert.subject.replace(`CN=`, ``);
                if (name === subject) {
                    resolve(cert);
                }
            }
        })

        const result = await promise;
        return result;
    }

    private prepareParams(params: WinCertificateParams) {
         return {
            storeName: params.storeName || '',
            storeLocation: params.storeLocation || '',
            hasStoreName: Boolean(params.storeName),
            hasStoreLocation: Boolean(params.storeLocation)
        } 
    }
}