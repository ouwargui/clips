import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

type Directory = {
  name: string;
  files: (Directory | string)[];
}

export async function listClips() {
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
    },
    endpoint: process.env.CLOUDFLARE_ENDPOINT as string,
    region: 'auto'
  });
  
  const command = new ListObjectsV2Command({
    Bucket: 'clips',
  })

  try {
    const directories: Directory[] = [];
    console.log("Your bucket contains the following objects:\n");
    let isTruncated = true;

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
      for (const content of Contents ?? []) {
        const directoryName = content.Key?.split('/')[0];
        const fileName = content.Key?.split('/')[1];

        if (directoryName === 'ssd') {
          const obj: Directory = {
            name: directoryName,
            files: [{
              name: fileName as string,
              files: [content.Key?.split('/')[2] as string]
            }]
          }

          const directory = directories.find(d => d.name === directoryName);
          if (directory) {
            const subDirectory = directory.files.find(f => typeof f === 'object' && f.name === fileName);
            if (subDirectory) {
              (subDirectory as Directory).files.push(content.Key?.split('/')[2] as string);
            } else {
              directory.files.push({name: fileName as string, files: [content.Key?.split('/')[2] as string]})
            }
          } else {
            directories.push(obj);
          }

          continue;
        }

        if (directoryName && fileName) {
          const directory = directories.find(d => d.name === directoryName);
          if (directory) {
            directory.files.push(fileName);
          } else {
            directories.push({ name: directoryName, files: [fileName] });
          }
        }
      }
      isTruncated = IsTruncated ?? false;
      command.input.ContinuationToken = NextContinuationToken;
    }

    return directories;
  } catch (err) {
    console.error(err);
    return [];
  }
}
