import { useRouter } from "next/router";
import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

export interface PostDetailProps {
    posts: any[],
    post: any
}

export default function PostDetailPage({ posts, post }: PostDetailProps) {
    const router = useRouter();
    return (<>
        <h1>PostDetail</h1>
        <p>Query:{JSON.stringify(router.query)}</p>

        {
            posts.map(post => <li key={post.id}>{post.title}</li>)
        }

        <p>{post.id}</p>
        <p>{post.title}</p>
        <p>{post.body}</p>
    </>)
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5")
        .then((response) => response.json());

    let lstId = res.map((x: any) => ({
        params: { postId: x.id.toString() }
    }));

    return {
        paths: lstId,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<PostDetailProps> =
    async (context: GetStaticPropsContext
    ) => {
        console.log("-- Context.params", context.params)
        console.log("-- Get static paths", context.params?.postId)

        const postId = context.params?.postId;
        if (!postId) return { notFound: true };

        const res =
            await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                .then((response) => response.json());

        return {
            props: {
                posts: [],
                post: res
            },
            revalidate: 5
        }
    }