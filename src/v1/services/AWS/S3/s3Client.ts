import {S3Client} from "@aws-sdk/client-s3";

const REGION = process.env.UC_AWS_REGION as string;
const ACCESS_KEY_ID = process.env.UC_AWS_ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY = process.env.UC_AWS_SECRET_ACCESS_KEY as string;

export const s3Client = new S3Client({
	region: REGION,
	credentials: {
		accessKeyId: ACCESS_KEY_ID,
		secretAccessKey: SECRET_ACCESS_KEY,
	}
});

