import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
    post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [, vote] = useVoteMutation();
    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            mr={4}
        >
            <IconButton
                onClick={() => {
                    if (post.voteStatus === 1) {
                        return;
                    }
                    vote({
                        postId: post.id,
                        value: 1,
                    });
                }}
                aria-label="Upvote Icon"
                variant="ghost"
                colorScheme={post.voteStatus === 1 ? "green" : undefined}
                icon={<ChevronUpIcon />}
            />
            {post.points}
            <IconButton
                onClick={() => {
                    if (post.voteStatus === -1) {
                        return;
                    }
                    vote({
                        postId: post.id,
                        value: -1,
                    });
                }}
                aria-label="Downvote Icon"
                variant="ghost"
                colorScheme={post.voteStatus === -1 ? "red" : undefined}
                icon={<ChevronDownIcon />}
            />
        </Flex>
    );
};
