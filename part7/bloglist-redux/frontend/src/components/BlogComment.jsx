import { useSelector } from "react-redux";
import AddComment from "./AddComment";
import { List, ListItem, Typography, Box } from "@mui/material";

const BlogComment = ({ id }) => {
  const comments = useSelector((state) => state.comments);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6">Comments</Typography>
      <AddComment id={id} />
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>{comment.content}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BlogComment;
