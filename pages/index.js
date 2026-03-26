import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, []);

  if (user) router.replace("/admin");
  return null;
}