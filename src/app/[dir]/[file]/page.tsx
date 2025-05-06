export default async function Clip({params}: { params: Promise<{ dir: string, file: string }> }) {
  const { dir, file} = await params;

  return (
    <div className="w-full h-screen">
      <video className="h-full w-full" autoPlay src={`https://clipsr2.guisantos.dev/${dir}/${file}`} controls></video>
    </div>
  )
}