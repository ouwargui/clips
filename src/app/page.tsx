import { listClips } from "@/clips/list-clips";
import Link from "next/link";

export default async function Home() {
  const clips = await listClips();

  return (
    <main>
      {clips.map((directory) => (
        <div key={directory.name} className="flex flex-col">
          <h2 className="text-4xl font-bold">{directory.name}</h2>
          <ul>
            {directory.files.map((file, idx) => (
              <li key={typeof file === 'object' ? `${file.name}.${idx}` : `${file}.${idx}`} className="text-2xl">
                {typeof file === 'object' ? (
                  <div>
                    <h3>{file.name}</h3>
                    <ul>
                      {file.files.map((subFile) => (
                        <li key={subFile as string} className="text-xl">
                          <Link href={encodeURI(`/${directory.name}/${file.name}/${subFile}`)}>{subFile as string}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link href={encodeURI(`/${directory.name}/${file}`)}>{file}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
