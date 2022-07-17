import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
//import Header from "@/components/common/header";

import dynamic from "next/dynamic";
import { MainLayout } from "@/components/layout";
const Header = dynamic(() => import("@/components/common/header"), { ssr: false });
export interface AboutPageProps {

}


export default function AboutPage(props: AboutPageProps) {
    const [lstPost, setLstPost] = useState([]);
    const router = useRouter();
    console.log("aboutPage Router", router.query)

    const handleNextButton = () => {
        router.push(
            {
                pathname: "/about",
                query: {
                    page: (Number(router.query.page) || 1) + 1,
                }
            },
            undefined,
            { shallow: true })
    }

    useEffect(() => {
        (async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5")
                .then((response) => response.json());
            setLstPost(res);
        })()
    }, [])

    return (<>
        <div>
            <h1>About</h1>
            <ul className="lstPost">
                {
                    lstPost.map((post: any) => (
                        <li key={post.id}>{post.title}</li>)
                    )
                }
            </ul>
            <Header />

            <button onClick={handleNextButton}>next clik</button>
        </div>
    </>)
}

AboutPage.Layout = MainLayout

export async function getStaticProps() {
    console.log("get static props")
    return {
        props: {}
    }
}