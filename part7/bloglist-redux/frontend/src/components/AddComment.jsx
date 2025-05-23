import { useDispatch } from "react-redux";
import { createComment } from "../reducers/commentReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Input, Button } from "@mui/material";

const AddComment = ({ id }) => {
  const dispatch = useDispatch();

  const handleComment = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    e.target.comment.value = "";
    console.log(comment);
    dispatch(createComment(id, comment));
    dispatch(setNotification(`a new comment: ${comment} added`, "success", 5));
  };

  return (
    <form onSubmit={handleComment}>
      <Input name="comment" />
      <Button type="submit">add comment</Button>
    </form>
  );
}

export default AddComment;