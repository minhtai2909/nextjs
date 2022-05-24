import { useRouter } from "next/router";
import React from "react";
export interface ParamProps {

}

export default function ParamPage(props: ParamProps) {
    const router = useRouter();
    return (<>
        <h1>Param</h1>
        <p>Query:{JSON.stringify(router.query)}</p>
    </>)
}

export async function getServerSideProps() {
    await new Promise(resolve => setTimeout(resolve, 3000))

    return {
        props: {},
    }
}