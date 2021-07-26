import { NavBar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { withUrqlClient } from "next-urql";

const Index = () => {
    const [{ data }] = usePostsQuery();
    return (
        <>
            <NavBar />
            <div>homepage</div>
            <br></br>
            {!data
                ? (<div>loading...</div>)
                : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
        </>
    );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
