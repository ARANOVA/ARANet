import fs from "fs";
import path from "path";
import { SignedXml } from "xml-crypto";
import * as forge from "node-forge";

function loadP12(p12Path: string, password: string) {
  const p12Buffer = fs.readFileSync(p12Path);
  const p12Asn1 = forge.asn1.fromDer(p12Buffer.toString("binary"), false);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);

  let privateKeyPem = "";
  let certPem = "";

  p12.safeContents.forEach((sc) => {
    sc.safeBags.forEach((sb) => {
      if (sb.type === forge.pki.oids.pkcs8ShroudedKeyBag && sb.key) {
        privateKeyPem = forge.pki.privateKeyToPem(sb.key);
      }
      if (sb.cert) {
        certPem = forge.pki.certificateToPem(sb.cert);
      }
    });
  });

  return { privateKeyPem, certPem };
}

export function signXmlString(
  xml: string,
  xpathToSign: string = "/*",
): string | Error {
  const CERT_PATH = process.env.CERT_PATH || '';
  if (!CERT_PATH) {
    return new Error('Needed env variable CERT_PATH');
  }
  const certPath = path.join(process.cwd(), CERT_PATH); //.replace('/ROOT/', './');
  if (!fs.existsSync(certPath)) {
    return new Error(`Certificate not found at ${certPath}`);
  }
  const CERT_PASSPHRASE = process.env.CERT_PASSPHRASE || '';
  if (!CERT_PASSPHRASE) {
    return new Error('Needed env variable CERT_PASSPHRASE');
  }
  
  const { privateKeyPem, certPem } = loadP12(certPath, CERT_PASSPHRASE);

  const sig = new SignedXml({
    privateKey: privateKeyPem,
    publicCert: certPem,
    canonicalizationAlgorithm: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
    signatureAlgorithm: "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256",
  });

  sig.addReference({
    xpath: xpathToSign,
    transforms: [
      "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
    ],
    digestAlgorithm: "http://www.w3.org/2001/04/xmlenc#sha256",
  });

  sig.computeSignature(xml);

  return sig.getSignedXml();
}
