import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

function getEncryptionKey(): Buffer {
  const value = process.env.GITLAB_TOKEN_ENCRYPTION_KEY;

  if (!value || !/^[a-f0-9]{64}$/i.test(value)) {
    throw new Error(
      "GITLAB_TOKEN_ENCRYPTION_KEY must be a 32-byte key encoded as 64 hexadecimal characters.",
    );
  }

  return Buffer.from(value, "hex");
}

export function encryptToken(token: string): string {
  if (!token) {
    throw new Error("Cannot encrypt an empty token.");
  }

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, getEncryptionKey(), iv);

  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  // Versioned format: v1:IV:AUTH_TAG:CIPHERTEXT
  return [
    "v1",
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted.toString("hex"),
  ].join(":");
}

export function decryptToken(encryptedToken: string): string {
  const [version, ivHex, authTagHex, ciphertextHex, ...extra] =
    encryptedToken.split(":");

  if (
    version !== "v1" ||
    !ivHex ||
    !authTagHex ||
    !ciphertextHex ||
    extra.length > 0 ||
    !/^[a-f0-9]+$/i.test(ivHex) ||
    !/^[a-f0-9]+$/i.test(authTagHex) ||
    !/^[a-f0-9]+$/i.test(ciphertextHex) ||
    ivHex.length !== IV_LENGTH * 2 ||
    authTagHex.length !== AUTH_TAG_LENGTH * 2 ||
    ciphertextHex.length === 0 ||
    ciphertextHex.length % 2 !== 0
  ) {
    throw new Error("Invalid encrypted token format.");
  }

  const decipher = createDecipheriv(
    ALGORITHM,
    getEncryptionKey(),
    Buffer.from(ivHex, "hex"),
  );

  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(ciphertextHex, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
