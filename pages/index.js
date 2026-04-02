import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    router.replace("/login");
  }, [router]);

  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}

export default function Index() {
  return null;
}