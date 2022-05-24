import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import React from "react";
export interface PostPageProps {
    posts: any[],
}

export default function PostListPage({ posts }: PostPageProps) {
    return (<>
        <div>This is a post page</div>

        {
            posts.map(post =>
                <li key={post.id}>
                    <Link href={`/posts/${post.id}`}>
                        <a>{post.title}</a>
                    </Link>
                </li>
            )
        }

    </>)
}
export const getStaticProps: GetStaticProps<PostPageProps> =
    async (context: GetStaticPropsContext
    ) => {
        const res =
            await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5`)
                .then((response) => response.json());

        return {
            props: {
                posts: res
            }
        }
    }


