import { listClips } from "@/clips/list-clips";

export default async function Home() {
  const clips = await listClips();

  return (
    <main>
      {clips.map((directory) => (
        <div key={directory.name} className="flex flex-col">
          <h2 className="text-4xl font-bold">{directory.name}</h2>
          <ul>
            {directory.files.map((file) => (
              <li key={typeof file === 'object' ? file.name : file} className="text-2xl">
                {typeof file === 'object' ? (
                  <div>
                    <h3>{file.name}</h3>
                    <ul>
                      {file.files.map((subFile) => (
                        <li key={subFile as string} className="text-xl">
                          <a href={encodeURI(`https://clipsr2.guisantos.dev/${directory.name}/${file.name}/${subFile}`)}>{subFile as string}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <a href={encodeURI(`https://clipsr2.guisantos.dev/${directory.name}/${file}`)}>{file}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
