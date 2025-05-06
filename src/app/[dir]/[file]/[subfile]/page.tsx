export default async function Clip({params}: { params: Promise<{ dir: string, file: string, subfile: string }> }) {
  const { dir, file, subfile } = await params;

  return (
    <div>
      <video src={`https://clipsr2.guisantos.dev/${dir}/${file}/${subfile}`} controls></video>
    </div>
  )
}