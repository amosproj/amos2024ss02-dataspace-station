import Link from 'next/link';
import Image from 'next/image';

const conList: ContainerProps[] = [
  { href: '/login', title: 'Bank', description: 'Description for Bank' },
  { href: '/login', title: 'Company', description: 'Description for Company' },
  { href: '/login', title: 'Tax Advisor', description: 'Description for Tax Advisor' },
];

interface ContainerProps{
  href: string;
  title: string;
  description: string;
}

const  Container = (props: ContainerProps) => {
  return(
      <Link href={props.href} legacyBehavior className="py-5">
        <a className="w-full">
          <div className=" hover:bg-neonBlue shadow-xl flex flex-col items-center justify-center p-4 rounded-xl bg-neonGreen transition">
            <h2 className="text-2xl font-bold text-neon">{props.title}</h2>
            <p className="text-gray-700">{props.description}</p>
          </div>
        </a>
      </Link>
  )
}

export default function Page() {
  return (
      <main className="flex min-h-screen flex-col p-6 bg-black">
        <div className="m-8 flex grow flex-col gap-4 md:flex-row ">
            <div className="m-8 flex flex-col justify-center rounded-lg px-3 py-5 md:w-2/5 md:px-20
             bg-neonBlue shadow-xl shadow-neonGreen">
              <Image src="/logo.png" alt="Logo" width={150} height={150} />
              <div>
              <p className="text-2xl  md:text-4xl md:leading-normal">
                Welcome to <br/><strong>International Dataspace Station Dashboard</strong>
              </p>
              </div>
            </div>
          <div className="flex flex-col items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12 gap-10">
              {conList.map((c) => {
                return (
                    <Container key={c.href} href={c.href} title={c.title} description={c.description}/>
                );
              })}
          </div>
        </div>
      </main>
  );
}
