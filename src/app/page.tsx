type Directory = {
  name: string;
  files: (Directory | string)[];
}

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/list-objects');
  const data = await response.json() as Directory[];

  return (
    <main>
      {data.map((directory) => (
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
