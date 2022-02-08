import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Link } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
    id: number;
    creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
    id,
    creatorId,
}) => {
    const [, deletePost] = useDeletePostMutation();
    const [{ data: meData }] = useMeQuery();

    if (meData?.me?.id !== creatorId) {
        return null;
    }
    return (
        <Box>
            <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
                <IconButton
                    as={Link}
                    mr={4}
                    aria-label="Edit Post"
                    icon={<EditIcon />}
                />
            </NextLink>
            <IconButton
                ml="auto"
                aria-label="Delete Post"
                icon={<DeleteIcon />}
                onClick={() => {
                    deletePost({
                        id,
                    });
                }}
            />
        </Box>
    );
};
