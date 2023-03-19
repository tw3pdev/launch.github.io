import Link from 'next/link'
import { useRouter } from "next/router";

export default function FourOhFour() {
    const router = useRouter();
    const  paramChain  = (router.asPath).split("chain=")[1]
  return (
    <>
    <h1>404 - Nothing in here</h1>
    <Link href={"/?chain="+paramChain}>
      <a>
        Go back home
      </a>
    </Link>
  </>
  )
}